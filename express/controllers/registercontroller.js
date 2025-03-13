const usersDb = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const fspromises = require("fs").promises;

const path = require("path");

const handlenewuser = async (req, res) => {
  const { username, pwd } = req.body;
  if (!username || !pwd) {
    return res.status(400).json({ message: "phhok k baitha h kya" });
  }
  // check for duplicate user in db
  const user = usersDb.users.find(
    (person) => person.username === req.body.username,
  );
  if (user) {
    return res.sendStatus(409); //409 for conflict
  }
  try {
    // encrypt the password
    const hashedpwd = await bcrypt.hash(pwd, 10);
    // store the new user in db
    const user = {
      username: username,
      password: hashedpwd,
    };
    const passingarray = [...usersDb.users, user];
    usersDb.setUsers(passingarray);
    await fspromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDb.users),
    );
    res
      .status(201)
      .json({ message: `${user.username} is succesfully registered` });
    console.log(usersDb.users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handlenewuser };
