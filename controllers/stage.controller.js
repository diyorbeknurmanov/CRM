const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const stageValidationSchema = require("../validations/stage");

const create = async (req, res) => {
  try {
    const { error, value } = stageValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { name, description } = value;
    const newStage = await pool.query(
      `INSERT INTO stage (name, description) VALUES ($1, $2) RETURNING *`,
      [name, description]
    );
    res.status(201).send(newStage.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM stage`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(`SELECT * FROM stage WHERE id=$1`, [id]);
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { error, value } = stageValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { id } = req.params;
    const { name, description } = value;
    const updated = await pool.query(
      `UPDATE stage SET name=$1, description=$2 WHERE id=$3`,
      [name, description, id]
    );

    res.status(201).send({ mesage: "updated" }, updated);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM stage WHERE id=$1`, [id]);
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
