const pool = require("../utils/db");
const bcrypt = require("bcrypt");

exports.signUpUser = async (req, res) => {
  try {
    const {
      name,
      age,
      dob,
      aadhar,
      phone,
      address,
      email,
      username,
      password,
    } = req.body;
    const isAdmin = false;
    const booked = false;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await pool.query(
      "INSERT INTO users (name,age,dob,aadhar,phone,address,email,username,password,isAdmin,booked) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        name,
        age,
        dob,
        aadhar,
        phone,
        address,
        email,
        username,
        hashedPassword,
        isAdmin,
        booked,
      ]
    );

    res.send({ status: true });
  } catch (err) {
    res.send({ status: false });
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    res.send(user.rows);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("DELETE from users WHERE id=$1", [id]);
    if (!user.rowCount) {
      res.send("Id doesnt exist");
    } else {
      res.json("User Deleted");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.send(users.rows);
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      age,
      dob,
      aadhar,
      phone,
      address,
      email,
      username,
      password,
      isAdmin,
    } = req.body;
    const changeuser = await pool.query(
      "UPDATE users SET name=$1,age=$2,dob=$3,aadhar=$4,phone=$5,address=$6,email=$7,username=$8,password=$9,isAdmin=$10 WHERE id=$11",
      [
        name,
        age,
        dob,
        aadhar,
        phone,
        address,
        email,
        username,
        password,
        isAdmin,
        id,
      ]
    );
    res.json("updated");
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email or username is required." });
    }
    user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (user.rows.length === 0) {
      return res.status(404).json({ status: false });
    }
    const hashedPassword = user.rows[0].password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res.status(401).json({ status: false });
    }
    const admin = user.rows[0].isadmin;
    res.json({ status: true, admin: admin, user: user.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.makeAdminUser = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await pool.query(
      "UPDATE users SET isadmin=true WHERE id=$1",
      [id]
    );
    res.send("Updated");
  } catch (error) {
    console.log(error);
  }
};
