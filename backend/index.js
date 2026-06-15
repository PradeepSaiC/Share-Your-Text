const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const dataObj = {};

app.get("/room/:id", (req, res) => {
  const roomId = req.params.id;
  if (roomId in dataObj) {
    res.status(200).json({
      message: "Joined room successfully"
    });
  } else {
    res.status(400).json({
      message: "Room does not exist"
    });
  }
});

app.get("/getdata/:id", (req, res) => {
  const id = req.params.id;
  if (id in dataObj) {
    res.status(200).json({
      textArr: dataObj[id]
    });
  } else {
    res.status(400).json({
      message: "Room Does Not Exist"
    });
  }
});

app.post("/savetext/:id", (req, res) => {
  const id = req.params.id;

  if (id in dataObj) {
    const { text } = req.body;
    dataObj[id].push(text);
    res.status(200).json({
      message: "Message sent successfully"
    });
  } else {
    res.status(400).json({
      message: "Room Does not exist"
    });
  }
});

app.get("/create-room", (req, res) => {
  const roomId = Math.floor(1000 + Math.random() * 9000);
  dataObj[roomId] = [];
  res.status(200).json({
    roomId: roomId
  });
});

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${PORT}`);
});
