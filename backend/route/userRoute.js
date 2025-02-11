const express = require("express");
const { createUser, updateUser, deleteUser, getAllUsers, createUsers, getUserById } = require("../controller/userController");

const router = express.Router();

router.post("/addUser", createUser);
router.put("/:id", updateUser);
router.delete("/", deleteUser);
router.get("/", getAllUsers);
router.post("/bulk", createUsers);
router.get("/userById/:id", getUserById);


// router.post("/bulk", createUsers);


module.exports = router;
