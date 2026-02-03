const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Admin"
    },
    schoolName: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });

// Add indexes
adminSchema.index({ email: 1 }, { unique: true });
adminSchema.index({ schoolName: 1 }, { unique: true });

module.exports = mongoose.model("admin", adminSchema)