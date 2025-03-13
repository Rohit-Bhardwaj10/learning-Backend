const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const PORT = process.env.PORT || 3500;
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieparser = require("cookie-parser");

// custom middleware logger....
app.use(logger);

// third party middleware....

const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsoptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsoptions));

// built in middleware to handle urlencoded data
// in other words form data
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieparser());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// providing routes
app.use("/subdir", require("./routes/subdir"));
app.use("/", require("./routes/root"));
// RESTapi
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/logout", require("./routes/api/logout"));


app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

// error handling middleware
app.use(errorHandler);

// app.get("^/$|/index(.html)?", (req, res) => {
//   //in express we can use regex in path name...
//   // ^/$|/index(.html)? -> this is a regex for / or /index.html where .html is optional...
//   // res.send('hello world')
//   // res.sendFile('./views/index.html', {root:__dirname} );
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// app.get("/new-page(.html)?", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "new-page.html"));
// });

// app.get("/old-page(.html)?", (req, res) => {
//   //redirecting in express
//   res.redirect(301, "./new-page.html"); //302 send by default
// });

// route handlers....

// ==>> handlers chaining..
// app.get(
//   "/hello(.html)?",
//   (req, res, next) => {
//     console.log("attempted to load hello.html");
//     next();  //next lets you move on to the next handler in chained functions.
//   },
//   (req, res) => {
//     res.send("hello world");
//   }
// );

// const one = (req, res, next) => {
//   console.log("one");
//   res.send("one first");
//   next();
// };

// const two = (req, res, next) => {
//   console.log("two");
//   next();
// };

// const three = (req, res, next) => {
//   console.log("three");
// };

// app.get("/chain(.html)?", [one, two, three]); //chaining functions

// app.get("/*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

// app.all() is used for routing

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

// middleware(it is anything that comes b/w request and response)
// 3 types -> built-in , custom and third party middleware...

// => to-do : make a logut route
