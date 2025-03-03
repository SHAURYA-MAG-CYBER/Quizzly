require("dotenv").config();
const express =  require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes");
const attemptRoutes = require("./routes/attemptRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/quiz", quizRoutes);
app.use("/api/attempt", attemptRoutes);

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection Error: ", err));

app.get("/", (req,res) => {
    res.send("Quizzly Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen (PORT, () => console.log(`Server running on port ${PORT}`));