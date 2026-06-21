const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// storage setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// serve frontend
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));


app.listen(PORT, () => {
  console.log(`Server rning on  ${PORT}`);
});