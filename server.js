require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const widgetRoutes = require("./routes/widgetRoutes");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes

app.get("/", (req, res) => {
  res.send("🚀 Server running");
});

app.use("/api/widgets", widgetRoutes);

app.use(express.static("public"));

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
