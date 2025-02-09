const express = require("express");
const { createUser, updateUser, deleteUser, getAllUsers, createUsers } = require("../controller/userController");

const router = express.Router();

router.post("/addUser", createUser);
router.put("/:id", updateUser);
router.delete("/", deleteUser);
router.get("/", getAllUsers);
router.post("/bulk", createUsers);

module.exports = router;
