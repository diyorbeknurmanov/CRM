const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");


const create = async (req, res) => {
  try {

    const { stuff_id, role_id } = req.body;
    const newstuff_role = await pool.query(
      `INSERT INTO stuff_role (stuff_id, role_id) VALUES ($1, $2) RETURNING *`,
      [stuff_id, role_id]
    );
    res.status(201).send(newstuff_role.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {

    const FindAll = await pool.query(`SELECT * FROM stuff_role`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(`SELECT * FROM stuff_role WHERE id=$1`, [id]);
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { error, value } = stuff_roleValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { id } = req.params;
    const { stuff_id, role_id } = value;
    const updated = await pool.query(
      `UPDATE stuff_role SET stuff_id=$1, role_id=$2 WHERE id=$3`,
      [stuff_id, role_id, id]
    );

    res.status(201).send({ mesage: "updated" }, updated);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM stuff_role WHERE id=$1`, [id]);
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
