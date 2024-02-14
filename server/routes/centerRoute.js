const express = require("express");
const {
  getUserCenter,
  getAllCenter,
  postCenter,
  updateCenter,
  deleteCenter,
} = require("../controller/centerController");

const router = express.Router();

router.get("/allcenter", getAllCenter);

router.get("/:id", getUserCenter);

router.post("/createcenter", postCenter);

router.put("/:id", updateCenter);

router.delete("/:id", deleteCenter);

module.exports = router;
