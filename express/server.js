const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const logEvents = require("./middleware/logEvents");
const PORT = process.env.PORT || 3500;
const errorHandler = require("./middleware/errorHandler");

// custom middleware logger....
app.use((req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
});

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

// serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
  //in express we can use regex in path name...
  // ^/$|/index(.html)? -> this is a regex for / or /index.html where .html is optional...
  // res.send('hello world')
  // res.sendFile('./views/index.html', {root:__dirname} );
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  //redirecting in express
  res.redirect(301, "./new-page.html"); //302 send by default
});

// route handlers....

// ==>> handlers chaining..
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("hello world");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res, next) => {
  console.log("three");
  res.send("finally");
};

app.get("/chain(.html)?", [one, two, three]); //chaining functions

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

// middleware(it is anything that comes b/w request and response)
// 3 types -> built-in , custom and third party middleware...