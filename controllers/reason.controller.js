const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const reasonValidation = require("../validations/reason");

const create = async (req, res) => {
  try {
    const { error, value } = await reasonValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { reason_lid } = value;
    const newstatus = await pool.query(
      `INSERT INTO reason (reason_lid) VALUES ($1) RETURNING *`,
      [reason_lid]
    );
    res.status(201).send(newstatus.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM reason`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(`SELECT * FROM reason WHERE id=$1`, [id]);
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { error, value } = reasonValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { id } = req.params;
    const { reason_lid } = value;
    const updated = await pool.query(
      `UPDATE reason SET reason_lid=$1 WHERE id=$2 RETURNING *`,
      [reason_lid, id]
    );
    res.status(200).send({ message: "updated", data: updated.rows[0] });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM reason WHERE id=$1`, [id]);
    res.status(200).send({ message: "deleted..." });
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
