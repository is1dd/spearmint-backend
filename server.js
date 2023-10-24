const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
app.use(cors());

// Connect to MongoDB Atlas
const mongoURI =
  "mongodb+srv://siddharthsharma9660:hellospearmint@cluster0.vfu1dvn.mongodb.net/test";
const dbConnect = () => {
  return mongoose.connect(mongoURI);
};
// Define Stocks Schema
const stockSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
});

const Stock = mongoose.model("Stock", stockSchema);

// Mock API Endpoint

app.get("/api/stocks/:symbol", async (req, res) => {
  const { symbol } = req.params;
  try {
    const stock = await Stock.findOne({ symbol });
    if (stock) {
      res.json({ price: stock.price });
    } else {
      res.status(404).json({ error: "Stock not found" });
    }
  } catch (error) {
    console.error("Error fetching stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
