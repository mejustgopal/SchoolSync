const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    }
}, { timestamps: true });

// Add indexes
complainSchema.index({ user: 1 });
complainSchema.index({ school: 1 });
complainSchema.index({ date: -1 });

module.exports = mongoose.model("complain", complainSchema);