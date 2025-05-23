const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const lidValidation = require("../validations/lid");

const create = async (req, res) => {
  try {
    const { error, value } = lidValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const {
      first_name,
      last_name,
      phone_number,
      target_id,
      stage_id,
      test_date,
      lesson_date,
      lesson_time,
      group_id,
      status_id,
      reason_id,
    } = value;
    const newlid = await pool.query(
      `INSERT INTO "lid" (first_name, last_name, phone_number, target_id, stage_id, test_date, lesson_date, lesson_time, group_id , status_id, reason_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        first_name,
        last_name,
        phone_number,
        target_id,
        stage_id,
        test_date,
        lesson_date,
        lesson_time,
        group_id,
        status_id,
        reason_id,
      ]
    );
    res.status(201).send(newlid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM "lid"`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(`SELECT * FROM "lid" WHERE id=$1`, [id]);
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone_number,
      target_id,
      stage_id,
      test_date,
      lesson_date,
      lesson_time,
      group_id,
      status_id,
      reason_id,
    } = req.body;
    const updated = await pool.query(
      `UPDATE "lid" SET 
      first_name = $1, 
      last_name = $2, 
      phone_number = $3, 
      target_id = $4, 
      stage_id = $5, 
      test_date = $6, 
      lesson_date = $7, 
      lesson_time = $8, 
      group_id = $9,
      status_id = $10,
      reason_id = $11
      WHERE id = $12`,
      [
        first_name,
        last_name,
        phone_number,
        target_id,
        stage_id,
        test_date,
        lesson_date,
        lesson_time,
        group_id,
        status_id,
        reason_id,
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
    const remov = pool.query(`DELETE FROM "lid" WHERE id=$1`, [id]);
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
