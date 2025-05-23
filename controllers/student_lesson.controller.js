const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const student_lesson_validation = require("../validations/student_lesson");

const create = async (req, res) => {
  try {
    const { error, value } = student_lesson_validation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { lesson_id, student_id, is_there, reason, be_paid } = value;
    const newLesson = await pool.query(
      `INSERT INTO student_lesson (lesson_id, student_id, is_there, reason, be_paid) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [lesson_id, student_id, is_there, reason, be_paid]
    );
    res.status(201).send(newLesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM student_lesson`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(
      `SELECT * FROM student_lesson WHERE id=$1`,
      [id]
    );
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { error, value } = student_lesson_validation.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { id } = req.params;
    const { lesson_id, student_id, is_there, reason, be_paid } = value;
    const updated = await pool.query(
      `UPDATE student_lesson SET lesson_id=$1, student_id=$2, is_there=$3, reason=$4, be_paid=$5 WHERE id=$6`,
      [lesson_id, student_id, is_there, reason, be_paid, id]
    );

    res.status(201).send({ mesage: "updated" }, updated);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM student_lesson WHERE id=$1`, [id]);
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
