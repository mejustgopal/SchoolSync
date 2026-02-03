const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subName: {
        type: String,
        required: true,
    },
    subCode: {
        type: String,
        required: true,
    },
    sessions: {
        type: String,
        required: true,
    },
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
    }
}, { timestamps: true });

// Add indexes for better query performance
subjectSchema.index({ sclassName: 1 });
subjectSchema.index({ school: 1 });
subjectSchema.index({ teacher: 1 });
subjectSchema.index({ subCode: 1 }, { unique: true });

module.exports = mongoose.model("subject", subjectSchema);