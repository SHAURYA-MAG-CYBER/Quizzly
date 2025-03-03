const express = require("express");
const router = express.Router();
const Attempt = require("../models/Attempt.js");

console.log("📌 Attempt Model:", Attempt);

router.post("/save", async(req,res) => {
  console.log("📌 Incoming Data:", req.body);
    try {
        const obj =  {
            "question": req.body["question"],
            "type": req.body["type"],
            "options": req.body["options"],
            "correctAnswer": req.body["correctAnswer"],
          }
        const newAttempt = new Attempt(req.body);
        await newAttempt.save();
        console.log(obj);
        res.status(201).json({message: "Attempt saved successfully!"})
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});


router.get("/all", async (req, res) => {
    try {
      const attempts = await Attempt.find().sort({ score: -1 }); // Sort by highest score
      console.log("📌 Sending Attempts from MongoDB:", attempts);
      res.json(attempts);
    } catch (error) {
      console.error("❌ Error fetching attempts:", error.message);
      res.status(500).json({ error: error.message });
    }
});
  

router.delete("/clear", async (req, res) => {
  try {
    await Attempt.deleteMany({}); // ✅ Delete all attempts
    res.json({ message: "Leaderboard cleared successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;