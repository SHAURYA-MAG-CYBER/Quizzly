const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");


router.post("/add", async(req,res) => {
    console.log("📌 Incoming POST request:", req.body);

    try {
        const newQuiz = new Quiz(req.body);
        await newQuiz.save();
        res.status(201).json({message: "Quiz added successfully!" });
    } catch(error) {
        console.error("Error adding quiz:", error.message);
        res.status(500).json({error: error.message});
    }
});


router.get("/all", async(req,res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;