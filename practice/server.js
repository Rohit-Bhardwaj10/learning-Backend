const url = require("url");
const fs = require("fs");
const http = require("http");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log("hello");
  const dateTime = `${format(
    new Date(),
    "yyyy-MM-dd\tHH:mm:ss"
  )} \t${uuid()}\t${req.url}\n`;
   //parse the request url....
  const myurl = url.parse(req.url,true) //by true we are enabling parse quey string to get query parameters differently...
  if (req.url == "/favicon.ico") return res.end();
  res.end(`hello there ${myurl.query.myname}`)
  fs.appendFileSync("./logs.txt", dateTime);
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
