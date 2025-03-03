const mongoose = require("mongoose");
// const { default: question } = require("../../src/data/questions");

const quizSchema = ({
    question: {type: String, required: true},
    type: { type: String, enum: ["mcq", "text"], required: true }, // MCQ or text-based
    options: { type: [String], required: function () { return this.type === "mcq"; } }, // Only for MCQs
    correctAnswer: { type: String, required: true },
});

const Quiz = mongoose.model("Quiz",quizSchema);
module.exports = Quiz;