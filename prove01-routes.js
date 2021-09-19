const fs = require("fs");

users = ["Jane", "Amanda", "Sally", "Monique"];

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Welcome</title></head>");
    res.write(
      '<body><a href="/users">Users</a><h1>Create a new User</h1><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Welcome</title></head>");
    res.write(`<body><a href="/">Home</a><h1>Users</h1>`);
    res.write("<ul>");

    users.map((user) => {
      res.write(`<li>${user}</li>`);
    });

    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log(username);
      users.push(username);
    });

    // To redirect:
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();

    // res.setHeader("Content-Type", "text/html");
    // res.write("<html>");
    // res.write(`<head><title>Welcome, new user!</title></head>`);
    // res.write(`<body><a href="/">Home</a><h1>Welcome, new user!</h1>`);

    // res.write("</body>");
    // res.write("</html>");
    // return res.end();
  }
};

module.exports = requestHandler;
