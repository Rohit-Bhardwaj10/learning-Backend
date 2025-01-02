const { log } = require("console");
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

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

const one = (req,res,next)=>{
    console.log('one');
    next()
}

const two = (req,res,next)=>{
    console.log('two');
    next()
}

const three = (req,res,next)=>{
    console.log('three');
    res.send('finally')
}


app.get('/chain(.html)?',[one,two,three]); //chaining functions 


app.get("/*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  });

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});


// middleware
