const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Server Test"
  })
})

app.listen(4000);

lists: {
  1: ["A","B","C","D","E","F"],
  2: ["A","B","C","D","E","F"],
  3: ["A","B","C","D","E","F"],
},
short_description: "Du bist hier, weil du eine Idee brauchst. Mal sehen was dir so einfällt.",
long_description: "Dies ist eine Ideengenerierung die auf dem Prinzip der Semantischen Intuition basiert. Nutze die Knöpfe die dir gegeben sind um die das Erlebnis anzupassen.",
saved_combinations: [],
idea_description: "Hier steht gleich deine super Idee."
