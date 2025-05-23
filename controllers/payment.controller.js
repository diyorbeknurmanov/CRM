const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const paymentValidation = require("../validations/payment");

const create = async (req, res) => {
  try {
    const { error, value } = paymentValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const {
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attent,
    } = value;
    const newpayment = await pool.query(
      `INSERT INTO "payment" (student_id, payment_last_date, payment_date, price, is_paid, total_attent ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        student_id,
        payment_last_date,
        payment_date,
        price,
        is_paid,
        total_attent,
      ]
    );
    res.status(201).send(newpayment.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM "payment"`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(`SELECT * FROM "payment" WHERE id=$1`, [
      id,
    ]);
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attent,
    } = req.body;
    const updated = await pool.query(
      `UPDATE "payment" SET 
      student_id = $1, 
      payment_last_date = $2, 
      payment_date = $3, 
      price = $4, 
      is_paid = $5, 
      total_attent = $6
      WHERE id = $7`,
      [
        student_id,
        payment_last_date,
        payment_date,
        price,
        is_paid,
        total_attent,
        id,
      ]
    );

    res.status(201).send({ mesage: "updated" }, updated);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM "payment" WHERE id=$1`, [id]);
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
