const usersDb = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const fspromises = require("fs").promises;
const path = require("path");

const handlesigin = async (req, res) => {
  const { username, pwd } = req.body;
  if (!username || !pwd) {
    return res.status(400).json({ message: "phhok k baitha h kya" });
  }
  const founduser = usersDb.users.find(
    (person) => person.username === username,
  );
  if (!founduser) {
    return res.sendStatus(401); //unauthorised
  }
  // evaluate password
  const pass = await bcrypt.compare(pwd, founduser.password);
  if (pass) {
    // pass jwt
    const accessToken = jwt.sign(
      { username: founduser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" },
    );
    const refreshToken = jwt.sign(
      { username: founduser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );
    // store the refresh token in a http only cookie , so that someone cant access it via js
    const otherusers = usersDb.users.filter(
      (person) => person.username !== founduser.username,
    );
    const currentuser = { ...founduser, refreshToken };
    usersDb.setUsers([...otherusers, currentuser]);
    await fspromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDb.users),
    );
    // sending refresh token as cokkie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    return res.sendStatus(401);
  }
};

module.exports = { handlesigin };
