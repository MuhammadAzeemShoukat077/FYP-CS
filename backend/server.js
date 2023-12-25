const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const resetPasswordRoutes = require("./routes/resetPasswordRoutes");
const otpRoutes = require("./routes/otpRoutes");

const app = express();
const PORT = process.env.PORT || 3000; // Use a default value if PORT is not defined

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://azeemshoukat:123test@finalyearproject.do0p91z.mongodb.net/your-database-name",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Database connection events
const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to the database");
});

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/reset", resetPasswordRoutes);


app.use("/otp", otpRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
