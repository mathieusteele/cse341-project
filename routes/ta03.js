//TA03 PLACEHOLDER
const express = require("express");
const router = express.Router();
const https = require("https");

// const stuff = [{}];

router.get("/", (req, res, next) => {
  let url = "https://www.reddit.com/r/popular.json";

  const test = https
    .get(url, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          let json = JSON.parse(body);
          // do something with JSON
          // const stuff = json;
          return json;
          console.log(json);
        } catch (error) {
          console.error(error.message);
        }
      });
    })
    .on("error", (error) => {
      console.error(error.message);
    });

  console.log(test.response);
  res.render("pages/ta03", {
    title: "Team Activity 03",
    path: "/ta03", // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    stuff: test,
  });
});

module.exports = router;
