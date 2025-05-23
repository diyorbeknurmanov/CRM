const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const groupValidation = require("../validations/group");

const create = async (req, res) => {
  try {
    const { error, value } = groupValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const {
      name,
      lesson_start_time,
      lesson_end_time,
      lessson_week_day,
      stage_id,
      branch_id,
      room_floor,
      room,
      lesson_quanity,
    } = value;
    const newgroup = await pool.query(
      `INSERT INTO "group" (name, lesson_start_time, lesson_end_time, lessson_week_day, stage_id, branch_id, room_floor, room, lesson_quanity ) VALUES ($1,$2,$3,$4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        name,
        lesson_start_time,
        lesson_end_time,
        lessson_week_day,
        stage_id,
        branch_id,
        room_floor,
        room,
        lesson_quanity,
      ]
    );
    res.status(201).send(newgroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const FindAll = await pool.query(`SELECT * FROM "group"`);
    res.status(200).send(FindAll.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await pool.query(`SELECT * FROM "group" WHERE id=$1`, [id]);
    res.status(200).send(findOne.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      lesson_start_time,
      lesson_end_time,
      lessson_week_day,
      stage_id,
      branch_id,
      room_floor,
      room,
      lesson_quanity,
    } = req.body;
    const updated = await pool.query(
      `UPDATE "group" SET 
      name = $1, 
      lesson_start_time = $2, 
      lesson_end_time = $3, 
      lessson_week_day = $4, 
      stage_id = $5, 
      branch_id = $6, 
      room_floor = $7, 
      room = $8, 
      lesson_quanity = $9 
      WHERE id = $10`,
      [
        name,
        lesson_start_time,
        lesson_end_time,
        lessson_week_day,
        stage_id,
        branch_id,
        room_floor,
        room,
        lesson_quanity,
        id,
      ]
    );

    res.status(201).send({ mesage: "updated" }, updated);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remov = pool.query(`DELETE FROM "group" WHERE id=$1`, [id]);
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
