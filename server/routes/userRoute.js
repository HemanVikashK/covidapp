const express = require("express");
const {
  getAllUsers,
  getUser,
  deleteUser,
  signUpUser,
  updateUser,
  loginUser,
  makeAdminUser,
} = require("../controller/userController");
const router = express.Router();

//GETALL only for admin
router.get("/allusers", getAllUsers);

//GET for both user and admin
router.get("/:id", getUser);

//signup only for user
router.post("/signup", signUpUser);

//login only for user
router.post("/login", loginUser);

//login only for user
router.post("/makeadmin/:id", makeAdminUser);

//for both user and admin
router.put("/update/:id", updateUser);

//for both user and admin
router.delete("/delete/:id", deleteUser);

module.exports = router;
