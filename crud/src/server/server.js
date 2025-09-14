const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("../../app");

// Load environment variables
dotenv.config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

/* MongoDB connection and server startup */
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected!");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port: http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed!", err);
    process.exit(1);
  });
