const express = require("express");
const { createUser, updateUser, deleteUser, getAllUsers, createUsers, getUserById, createRegister, loginUser } = require("../controller/userController");
const authenticateUser = require('../middleware/authMiddleware')
const router = express.Router();
// authenticateUser
router.post("/addUser", authenticateUser, createUser);
router.put("/:id", authenticateUser, updateUser);
router.delete("/", authenticateUser, deleteUser);
router.get("/", authenticateUser, getAllUsers);
router.post("/bulk", createUsers);
router.get("/userById/:id", authenticateUser, getUserById);
router.post("/register", createRegister);
router.post("/login", loginUser);

// loginUser

// createRegister


// router.post("/bulk", createUsers);


module.exports = router;
