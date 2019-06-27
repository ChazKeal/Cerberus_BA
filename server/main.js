const express = require('express');
const cors = require('cors')
const app = express();

// Middleware
app.use(cors())

// data
const lists = {
  1: ["A", "B", "C", "D", "E", "F"],
  2: ["A", "B", "C", "D", "E", "F"],
  3: ["A", "B", "C", "D", "E", "F"]
};

const text = {
  short_description:
    "Du bist hier, weil du eine Idee brauchst. Mal sehen was dir so einfällt.",
  long_description:
    "Dies ist eine Ideengenerierung die auf dem Prinzip der Semantischen Intuition basiert. Nutze die Knöpfe die dir gegeben sind um die das Erlebnis anzupassen.",
  saved_combinations: [],
  idea_description: "Hier steht gleich deine super Idee."
};

// index route
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Server Test"
  });
});

// list routes
app.get("/lists", (req, res) => {
  res.status(200).json({
    lists
  });
});
// text routes
app.get("/text", (req, res) => {
  res.status(200).json({
    text
  });
});

app.listen(4000, () => {
  console.log("server: http://localhost:4000");
});
