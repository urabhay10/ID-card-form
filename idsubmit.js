const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const fs = require("fs");
const port = 80;

const signstorage = multer.diskStorage({
  destination: "./sign-uploads/",
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const photostorage = multer.diskStorage({
  destination: "./photo-uploads/",
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: signstorage });

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.post;
//home page
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("index.pug", params);
});

//submitted post
app.post(
  "/submit",
  upload.fields([{ name: "signature" }, { name: "photo" }]),
  (req, res) => {
    let name = req.body.name;
    let roll = req.body.roll;
    let bloodgroup = req.body.bloodgroup;
    let dob = req.body.dob;
    let phonenumber = req.body.phonenumber;
    let address = req.body.address;
    let hostelite = req.body.hostelite;
    let text = `${name}\n${roll}\n${bloodgroup}\n${dob}\n${phonenumber}\n${address}\n${hostelite}\n`;
    fs.appendFileSync("id-data.txt", text);
    console.log(this.files);
    const signatureFile = req.files.signature[0];
    const destinationDirectory = "./sign-uploads/";
    const uniqueFilename =
      Date.now() + path.extname(signatureFile.originalname);
    const destinationPath = path.join(destinationDirectory, uniqueFilename);
    fs.rename(signatureFile.path, destinationPath, (err) => {
      if (err) {
        return res.status(500).send("Error saving the signature file.");
      }
    });

    const photoFile = req.files.photo[0];
    const destinationDirectory2 = "./photo-uploads/";
    const uniqueFilename2 = Date.now() + path.extname(photoFile.originalname);
    const destinationPath2 = path.join(destinationDirectory2, uniqueFilename2);
    fs.rename(photoFile.path, destinationPath2, (err) => {
      if (err) {
        return res.status(500).send("Error saving the signature file.");
      }
    });

    const params = {};
    res.status(200).render("submitted.pug", params);
  }
);

app.get("/submit", (req, res) => {
  const params = {};
  res.status(200).render("submitted.pug", params);
});

//start server
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
