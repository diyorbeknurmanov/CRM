const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const staffValidation = require("../validations/staff");

const create = async (req, res) => {
  try {
    const { error, value } = staffValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { first_name, last_name, phone_nomer, login, password, is_active } =
      value;
    const newStaff = pool.query(
      `INSERT INTO stuff (first_name, last_name, phone_nomer, login, password, is_active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [first_name, last_name, phone_nomer, login, password, is_active]
    );

    res.status(201).send((await newStaff).rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM stuff`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(`SELECT * FROM stuff WHERE id=$1`, [id]);
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = staffValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { first_name, last_name, phone_nomer, login, password, is_active } =
      value;
    const updated = await pool.query(
      `UPDATE stuff SET first_name=$1, last_name=$2, phone_nomer=$3, login=$4, password=$5, is_active=$6 WHERE id=$7 RETURNING *`,
      [first_name, last_name, phone_nomer, login, password, is_active, id]
    );
    res.status(200).send({ message: "stuff updated", data: updated.rows[0] });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM stuff WHERE id=$1`, [id]);
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
