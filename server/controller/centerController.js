const pool = require("../utils/db");
exports.postCenter = async (req, res) => {
  try {
    const { hname, location, seats, date } = req.body;
    const controller = await pool.query(
      "INSERT INTO center(hname,location,seats,date)values($1,$2,$3,$4)",
      [hname, location, seats, date]
    );
    res.json({ status: true });
  } catch (error) {
    res.json({ status: false });
  }
};

exports.getUserCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const controller = await pool.query("SELECT * from center WHERE id=$1", [
      id,
    ]);
    res.send(controller);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllCenter = async (req, res) => {
  try {
    const controller = await pool.query("SELECT * FROM center");
    res.send(controller.rows);
  } catch (error) {
    console.log(error);
  }
};
exports.deleteCenter = async (req, res) => {
  try {
    const id = req.params.id;
    const controller = await pool.query("DELETE FROM center WHERE id=$1", [id]);
    if (!controller.rowCount) {
      res.send("id does not exsist");
    } else {
      res.json("id deleted");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.updateCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const { hname, location, seats, date } = req.body;
    const controller = await pool.query(
      "UPDATE center SET hname=$1,location=$2,seats=$3,date=$4 WHERE id=$5",
      [hname, location, seats, date, id]
    );
    res.json("updated");
  } catch (error) {
    console.log(error);
  }
};
