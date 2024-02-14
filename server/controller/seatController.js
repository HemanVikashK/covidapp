const pool = require("../utils/db");

exports.getSeats = async (req, res) => {
  try {
    const id = req.params.id;
    const seats = await pool.query(
      "SELECT users.* FROM users JOIN seats ON users.id = seats.user_id WHERE seats.center_id = $1",
      [id]
    );
    res.send(seats.rows);
  } catch (error) {
    console.log(error);
  }
};

exports.assignSeat = async (req, res) => {
  try {
    const { userid, centerid } = req.body;
    const booked = await pool.query(
      "UPDATE users SET booked=$1,centerbooked=$2 WHERE id=$3",
      [true, centerid, userid]
    );
    const seat = await pool.query(
      "SELECT COUNT(*) AS seat_count FROM seats WHERE center_id = $1",
      [centerid]
    );
    const insertseat = await pool.query(
      "INSERT INTO seats (user_id,center_id,seat_number) VALUES ($1,$2,$3)",
      [userid, centerid, parseInt(seat.rows[0].seat_count, 10) + 1]
    );
    res.send({ status: true });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const { userid, centerid } = req.body;
    const seat = await pool.query(
      "DELETE FROM seats WHERE center_id = $1 and user_id=$2",
      [centerid, userid]
    );
    const user = await pool.query(
      "UPDATE users SET centerbooked = NULL,booked = 'f' WHERE centerbooked = $1",
      [centerid]
    );
    res.send(seat);
  } catch (error) {
    console.error(error);
  }
};

exports.countSeat = async (req, res) => {
  try {
    const seat = await pool.query(
      "SELECT COUNT(*) AS seat_count FROM seats WHERE center_id = $1",
      [centerid]
    );
    res.send(seat);
  } catch (error) {
    console.error(error);
  }
};
