const mongoose = require("mongoose");

const sclassSchema = new mongoose.Schema({
    sclassName: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true });

// Add indexes for better query performance
sclassSchema.index({ sclassName: 1, school: 1 }, { unique: true });
sclassSchema.index({ school: 1 });

module.exports = mongoose.model("sclass", sclassSchema);

