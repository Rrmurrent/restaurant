// jshint esversion: 6
// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// tables
// =============================================================
class Table {
  constructor(name, number, email, id) {
    this.name = name;
    this.number = number;
    this.email = email;
    this.id = id;
    this.server = ["Magee", "McGraw", "McGuberson"][Math.floor(Math.random() * 3)];
  }
}

reservations = [];
waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "restaurant.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/tables", function(req, res) {
  res.send("get out of here, you stalker.");
});

// displays the reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

// displays the wait list
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

app.delete("/api/reservations", function(req, res) {
  
});

// Create New Characters - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  if (req.body.name && req.body.email && req.body.number && req.body.id) {
    var newRes = new Table(req.body.name, req.body.number, req.body.email, req.body.id);

    console.log(newRes);
  
    if(reservations.length < 5) {
      reservations.push(newRes);
      res.json(newRes);
    } 
    else {
      waitlist.push(newRes);
    }
  }
  else {
    res.send("reservation failed. please provide all required fields.");
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || 5000, function() {
  console.log("App listening on PORT " + PORT);
});
