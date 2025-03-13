const usersDb = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

require("dotenv").config();
const jwt = require("jsonwebtoken");

const handlerefresh = async (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies.jwt;
  console.log(cookies);
  if (!cookies?.jwt) {
    return res.status(401);
  }
  console.log(cookies.jwt);

  const founduser = usersDb.users.find(
    (person) => person.refreshToken === refreshToken,
  );
  if (!founduser) {
    return res.sendStatus(403); //forbidden
  }
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || founduser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" },
    );
    res.json({ accessToken });
  });
};

module.exports = { handlerefresh };
