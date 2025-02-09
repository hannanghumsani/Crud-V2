const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "First name must be at least 3 characters long"],
            maxlength: [20, "First name cannot exceed 20 characters"],
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Last name must be at least 3 characters long"],
            maxlength: [20, "Last name cannot exceed 20 characters"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("dummyusers", userSchema);
