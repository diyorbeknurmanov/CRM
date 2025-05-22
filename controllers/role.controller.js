const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const roleValidation = require("../validations/role");

const create = async (req, res) => {
  try {
    const { error, value } = roleValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { name } = value;
    const newrole = await pool.query(
      `INSERT INTO role (name) VALUES ($1) RETURNING *`,
      [name]
    );
    res.status(201).send(newrole.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM role`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(`SELECT * FROM role WHERE id=$1`, [id]);
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { error, value } = roleValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { id } = req.params;
    const { name } = value;
    const updated = await pool.query(`UPDATE role SET name=$1 WHERE id=$2`, [
      name,
      id,
    ]);

    res.status(201).send({ mesage: "updated" }, updated);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM role WHERE id=$1`, [id]);
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
