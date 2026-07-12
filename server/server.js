const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});