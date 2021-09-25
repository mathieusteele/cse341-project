//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require("express");
const router = express.Router();

const users = ["Jared Austin", "Leroy Jenkins", "Frank Gorshen"];
const errors = [];

router.get("/", (req, res, next) => {
  res.render("pages/ta02", {
    title: "Team 8 Activity 02",
    path: "/ta02", // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    users: users,
    errors: errors,
  });
});

router.post("/addUser", (req, res, next) => {
  if (users.includes(req.body.user)) {
    errors.push(`Error! A user with the name ${req.body.user} already exists.`);
  } else {
    users.push(req.body.user);
  }

  res.writeHead(302, { Location: "/ta02/" });
  res.end();
});

router.post("/removeUser", (req, res, next) => {
  if (users.includes(req.body.user)) {
    position = users.indexOf(req.body.user);

    users.splice(position, 1);
  } else {
    errors.push(`There is no user ${req.body.user} found.`);
  }

  res.writeHead(302, { Location: "/ta02/" });
  res.end();
});

router.post("/clearError", (req, res, next) => {
  if (errors.includes(req.body.error)) {
    position = errors.indexOf(req.body.error);

    errors.splice(position, 1);
  }

  res.writeHead(302, { Location: "/ta02/" });
  res.end();
});

module.exports = router;
