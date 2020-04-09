const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

let path = require("path");

const postRoute = require("./routes/post_route");
require("dotenv").config();
app.use(cors());
app.use(express.json());

// serve static assets

app.use(express.static(path.join(__dirname, "/build")));

app.get("/", function (req, res) {
  res.send("hello world");
});
app.get("/test", function (req, res) {
  res.send({ msg: "this is a test" });
});

app.use("/post", postRoute);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
