//TA04 PLACEHOLDER
const { request } = require("express");
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  if (!req.session.style) {
    req.session.style = "blue";
  }
  if (!req.session.counter) {
    req.session.counter = 0;
  }
  req.session = res.render("pages/ta05", {
    title: "Team Activity 05",
    path: "/ta05", // For pug, EJS
    activeTA05: true, // For HBS
    contentCSS: true, // For HBS
    style: req.session.style,
    counter: req.session.counter,
  });
});

router.post("/counter", (req, res, next) => {
  if (req.body.counterAction === "increase") {
    req.session.counter = req.session.counter + 1;
  } else {
    req.session.counter = req.session.counter - 1;
  }

  res.redirect("/ta05");
});

router.post("/change-style", (req, res, next) => {
  if (req.session.style === "red") {
    req.session.style = "blue";
  } else if (req.session.style === "green") {
    req.session.style = "red";
  } else if (req.session.style === "blue") {
    req.session.style = "green";
  }

  res.redirect("/ta05");
});

router.post("/reset", (req, res, next) => {
  req.session.destroy().then((result) => {
    res.redirect("/ta05");
  });
});

module.exports = router;
