const uuid = require("uuid");
const otpGenerator = require("otp-generator");
const { sendErrorResponse } = require("../helpers/send_error_response");
const addMinutusToDate = require("../helpers/addMinitus");
const pool = require("../config/db");
const { encode, decode } = require("../helpers/crypt");
const { userMailService } = require("../service/mail.service");

const newOtp = async (req, res) => {
  try {
    const { phone_number, email } = req.body;
    const otp = otpGenerator.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const now = new Date();
    const exp_time = addMinutusToDate(now, 5);

    const newOtpDb = await pool.query(
      `
        insert into otp (id, otp, expiration_time) values ($1, $2, $3) returning id
    `,
      [uuid.v4(), otp, exp_time]
    );

    const details = {
      time: now,
      phone_number,
      email,
      otp_id: newOtpDb.rows[0].id,
    };

    const encodedData = await encode(JSON.stringify(details));

    await userMailService.sendMail(email, otp);

    res
      .status(200)
      .send({ message: "OTP genereted", verification_key: encodedData });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { verification_key, otp, phone_number } = req.body;
    const decodedData = await decode(verification_key);
    const data = JSON.parse(decodedData);

    if (phone_number != data.phone_number) {
      return res
        .status(400)
        .send({ message: "OTP bu telifon raqamga yuborilmagan" });
    }

    const otpResult = await pool.query(`SELECT * FROM otp WHERE id=$1`, [
      data.otp_id,
    ]);

    const result = otpResult.rows[0];
    if (result == null) {
      return res.status(400).send({ message: "Bunday OTP aniqlanmadi!" });
    }
    if (result.verifed == true) {
      return res.status(400).send({ message: "Bu OTP avval tekshirilgan" });
    }

    if (result.expiration_time < new Date()) {
      return res.status(400).send({ message: "Bu OTP ning vaqti otgan" });
    }

    if (otp != result.otp) {
      return res.status(400).send({ message: "OTP mos kelmadi" });
    }
    await pool.query(`UPDATE otp SET verifed=$2 WHERE id=$1`, [
      result.id,
      true,
    ]);

    const clientResult = await pool.query(
      `SELECT * FROM clent WHERE phone_number=$1`,
      [phone_number]
    );

    let clent_id, isNew;
    if (clientResult.rows.length == 0) {
      const newClient = await pool.query(
        `INSERT INTO clent (phone_number, is_active) VALUES ($1, $2) returning id`,
        [phone_number, true]
      );
      clent_id = newClient.rows[0].id;
      isNew = true;
    } else {
      clent_id = clientResult.rows[0].id;
      isNew = false;
      await pool.query(`update clent set is_active=true where id=$1`, [
        clent_id,
      ]);
    }
    res.status(200).send({ message: "OTP tekshiruvdan otdi", isNew, clent_id });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  newOtp,
  verifyOtp,
};
