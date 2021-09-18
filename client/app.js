const path = require("path");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
app.use(logger("dev"));
app.use(cors())

app.use(express.static(path.join(__dirname, "build")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server started on port ${process.env.PORT}`);
});