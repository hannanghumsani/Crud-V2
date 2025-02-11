const User = require("../model/User");
const RegisterUser = require("../model/RegisterSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();



const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, city, gender } = req.body;

        if (!firstName || !lastName || !email || !city || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new User({ firstName, lastName, email, city, gender });

        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const createUsers = async (req, res) => {
    try {
        const users = req.body;

        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ message: "Invalid request. Provide an array of users." });
        }

        for (let user of users) {
            if (!user.firstName || !user.lastName || !user.email || !user.city || !user.gender) {
                return res.status(400).json({ message: "Each user must have firstName, lastName, email, city, and gender." });
            }
            if (user.firstName.length < 3 || user.firstName.length > 20) {
                return res.status(400).json({ message: `First name must be between 3 and 20 characters: ${user.firstName}` });
            }
            if (user.lastName.length < 3 || user.lastName.length > 20) {
                return res.status(400).json({ message: `Last name must be between 3 and 20 characters: ${user.lastName}` });
            }
        }

        const emails = users.map(user => user.email);
        const existingUsers = await User.find({ email: { $in: emails } });

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "Some emails already exist", existingUsers });
        }

        const newUsers = await User.insertMany(users);

        res.status(201).json({ message: "Users created successfully", users: newUsers });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, city, gender } = req.body;

        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.city = city || user.city;
        user.gender = gender || user.gender;

        const updatedUser = await user.save();

        res.status(201).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const id = req.query.userId;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const getAllUsers = async (req, res) => {
    try {
        let { perPage, page } = req.query;

        perPage = parseInt(perPage) || 10;
        page = parseInt(page) || 1;

        const totalUsers = await User.countDocuments();

        const users = await User.find()
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.status(200).json({
            meta: {
                totalRecords: totalUsers,
                perPage,
                currentPage: page,
                totalPages: Math.ceil(totalUsers / perPage),
            },
            users,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Users found", user: user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const createRegister = async (req, res) => {
    try {
        const { firstName, email, password, confirmPassword } = req.body;

        if (!firstName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required: firstName, email, password, confirmPassword." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const existingUser = await RegisterUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new RegisterUser({
            firstName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, firstName: newUser.firstName, email: newUser.email },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await RegisterUser.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, email: user.email },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { loginUser };


module.exports = { createUser, updateUser, deleteUser, getAllUsers, createUsers, getUserById, createRegister, loginUser };

