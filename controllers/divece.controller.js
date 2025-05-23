const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const DeviceDetector = require("node-device-detector");

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  osIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});

const create = async (req, res) => {
  try {
    // let { error, value } = device_tokensValidation(req.body);

    // if (error) {
    //   return sendErrorResponse(error, res);
    // }

    const { user_id, token } = req.body;
    const userAgent = req.headers["user-agent"];
    const result = detector.detect(userAgent);

    const { device, os, client } = result;

    const newDevice = await pool.query(
      `
        INSERT INTO "devicetokens" (
        user_id,
        device,
        os,
        client,
        token)
        values ($1, $2, $3, $4, $5) RETURNING *
        `,
      [user_id, device, os, client, token]
    );

    res.status(201).send(newDevice.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};


const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM "devicetokens"`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(
      `SELECT * FROM "devicetokens" WHERE id=$1`,
      [id]
    );
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, device, os, client, token } = req.body;
    const updated = await pool.query(
      `UPDATE "devicetokens" SET 
      user_id = $1,
      device = $2,
      os = $3,
      client = $4,
      token = $5
      WHERE id = $6
      RETURNING *`,
      [user_id, device, os, client, token, id]
    );

    res.status(201).send({ mesage: "updated" }, updated);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM "devicetokens" WHERE id=$1`, [id]);
    res.status(200).send({ mesage: "deleted..." }, remov.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
