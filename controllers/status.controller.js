const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const statusValidation = require("../validations/status");

const create = async (req, res) => {
  try {
    const { error, value } = statusValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { status } = value;
    const newstatus = await pool.query(
      `INSERT INTO status (status) VALUES ($1) RETURNING *`,
      [status]
    );
    res.status(201).send(newstatus.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM status`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(`SELECT * FROM status WHERE id=$1`, [id]);
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { error, value } = statusValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { id } = req.params;
    const { status } = value;
    const updated = await pool.query(
      `UPDATE status SET status=$1 WHERE id=$2`,
      [status, id]
    );

    res.status(201).send({ mesage: "updated" }, updated);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM status WHERE id=$1`, [id]);
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
