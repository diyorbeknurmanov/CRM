const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const lessonValidation = require("../validations/lesson");

const create = async (req, res) => {
  try {
    const { error, value } = lessonValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { lesson_theme, lesson_number, group_id, lesson_date } = value;
    const newLesson = await pool.query(
      `INSERT INTO lesson (lesson_theme, lesson_number, group_id, lesson_date) VALUES ($1, $2, $3, $4) RETURNING *`,
      [lesson_theme, lesson_number, group_id, lesson_date]
    );
    res.status(201).send(newLesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM lesson`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(`SELECT * FROM lesson WHERE id=$1`, [id]);
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { error, value } = lessonValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { id } = req.params;
    const { lesson_theme, lesson_number, group_id, lesson_date } = value;
    const updated = await pool.query(
      `UPDATE lesson SET lesson_theme=$1, lesson_number=$2, group_id=$3, lesson_date=$4 WHERE id=$5`,
      [lesson_theme, lesson_number, group_id, lesson_date, id]
    );

    res.status(201).send({ mesage: "updated" }, updated);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM lesson WHERE id=$1`, [id]);
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
