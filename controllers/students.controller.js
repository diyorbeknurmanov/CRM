const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const studentsValidation = require("../validations/students");

const create = async (req, res) => {
  try {
    const { error, value } = studentsValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { lid_id, first_name, last_name, phone_number, birthday, male } =
      value;
    const newstudents = await pool.query(
      `INSERT INTO "students" (lid_id, first_name, last_name, phone_number, birthday, male) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [lid_id, first_name, last_name, phone_number, birthday, male]
    );
    res.status(201).send(newstudents.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM "students"`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(`SELECT * FROM "students" WHERE id=$1`, [
      id,
    ]);
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { lid_id, first_name, last_name, phone_number, birthday, male } =
      req.body;
    const updated = await pool.query(
      `UPDATE "students" SET 
      lid_id = $1, 
      first_name = $2, 
      last_name = $3, 
      phone_number = $4, 
      birthday = $5, 
      male = $6, 
      WHERE id = $7`,
      [lid_id, first_name, last_name, phone_number, birthday, male, id]
    );

    res.status(201).send({ mesage: "updated" }, updated);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM "students" WHERE id=$1`, [id]);
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
