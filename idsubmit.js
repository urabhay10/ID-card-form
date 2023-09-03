const express = require("express");
const path = require("path");
const app = express();
const port = 80;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


//home page
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("index.pug", params);
});

//start server
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
