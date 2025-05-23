const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const create = async (req, res) => {
  try {
    const { student_id, group_id } = req.body;
    const studet_group = await pool.query(
      `INSERT INTO student_group (student_id, group_id) VALUES ($1, $2) RETURNING *`,
      [student_id, group_id]
    );
    res.status(201).send(studet_group.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (_, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM student_group`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(
      `SELECT * FROM student_group WHERE id=$1`,
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
    const { student_id, group_id } = req.body;
    const updated = await pool.query(
      `UPDATE student_group SET status=$1, group_id=$2 WHERE id=$3`,
      [student_id, group_id, id]
    );

    res.status(201).send({ mesage: "updated" }, updated);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM student_group WHERE id=$1`, [id]);
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
