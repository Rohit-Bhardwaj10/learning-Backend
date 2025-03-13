require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authheader = req.headers["authorization"];
  if (!authheader) return res.sendStatus(401);

  console.log(authheader); //in form of Bearer Token , we need token
  const token = authheader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;

// {
// "username":"rohit",
// "pwd":"rohit1234"
// }
