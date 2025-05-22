const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const brachValidation = require("../validations/branch");

const create = async (req, res) => {
  try {
    const { error, value } = brachValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { name, address, call_number } = value;
    const newbranch = await pool.query(
      `INSERT INTO branch (name, address, call_number) VALUES ($1, $2, $3) RETURNING *`,
      [name, address, call_number]
    );
    res.status(201).send(newbranch.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM branch`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(`SELECT * FROM branch WHERE id=$1`, [id]);
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { error, value } = brachValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { id } = req.params;
    const { name, address, call_number } = value;
    const updated = await pool.query(
      `UPDATE branch SET name=$1, address=$2, call_number=$3 WHERE id=$4 RETURNING *`,
      [name, address, call_number, id]
    );

    res.status(200).send({ message: "updated", data: updated.rows[0] });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM branch WHERE id=$1`, [id]);
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
