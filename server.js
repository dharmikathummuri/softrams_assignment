const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
var hsts = require("hsts");
const path = require("path");
var xssFilter = require("x-xss-protection");
var nosniff = require("dont-sniff-mimetype");
const request = require("request");

const app = express();
app.use(express.json());
app.use("/headers", require("./routes/headers"));
app.use(cors());
app.use(express.static("assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/headers", require("./routes/headers"));
app.disable("x-powered-by");
app.use(xssFilter());
app.use(nosniff());
app.set("etag", false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, "dist/softrams-racing"), {
    etag: false
  })
);

// Get all members

app.get("/api/members", (req, res) => {
  request("http://localhost:3000/members", (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Get member with id

app.get("/api/getMember/:id", (req, res) => {
  let memberId = req.params.id;
  request.get(
    `http://localhost:3000/members/${memberId}`,
    (err, response, body) => {
      if (response.statusCode <= 500) {
        res.send(body);
      }
    }
  );
});

// TODO: Dropdown!
app.get("/api/teams", (req, res) => {});

// Submit Form!

app.post("/api/addMember", (req, res) => {
  const { firstName, lastName, jobTitle, status, team } = req.body.memberForm;
  if (
    firstName == "" ||
    lastName == "" ||
    jobTitle == "" ||
    status == "" ||
    team == ""
  ) {
    res.send({
      message: "please fill out all the fields"
    });
  } else {
    let data = {
      url: "http://localhost:3000/members",
      json: true,
      body: req.body.memberForm
    };
    request.post(data, (err, response, body) => {
      res.send(body);
    });
  }
});

// Edit member form

app.put("/api/editMember/:id", (req, res) => {
  const { firstName, lastName, jobTitle, status, team } = req.body.memberForm;
  if (
    firstName == "" ||
    lastName == "" ||
    jobTitle == "" ||
    status == "" ||
    team == ""
  ) {
    res.send({
      message: "please fill out all the fields"
    });
  } else {
    let memberId = req.params.id;
    let data = {
      url: `http://localhost:3000/members/${memberId}`,
      json: true,
      body: req.body.memberForm
    };
    request.put(data, (err, response, body) => {
      res.send(body);
    });
  }
});

// Delete Member

app.delete("/api/deleteMember/:id", (req, res) => {
  let memberId = req.params.id;
  request.delete(
    `http://localhost:3000/members/${memberId}`,
    (err, response, body) => {
      res.send(body);
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/softrams-racing/index.html"));
});

app.listen("8000", () => {
  console.log("Vrrrum Vrrrum! Server starting!");
});
