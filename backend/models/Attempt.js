const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
    username: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    date: { type: String, required: true }
});

const Attempt = new mongoose.model("Attempt", attemptSchema);
module.exports = Attempt;
