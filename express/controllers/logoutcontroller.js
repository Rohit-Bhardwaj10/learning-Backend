const usersDb = {
    users: require("../model/users.json"),
    setUsers: function (data) {
        this.users = data;
    },
};

require("dotenv").config();
const jwt = require("jsonwebtoken");
const fspromises = require('fs').promises
const path = require('path');
const { json } = require("stream/consumers");

const handlelogout = async (req, res) => {
    // on client side, remove the token
    
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
        // if user is not found erase the cookie
        res.clearCookie('jwt',{httpOnly:true,maxAge:24*60*60*1000})
        return res.sendStatus(204) //successfull but no content to send
    }
    // delete refreshtoken from db
    const otherusers = usersDb.users.filter(person => person.refreshToken !== refreshToken)
    const currentuser = {...founduser,refreshToken:''}
    const passing= [...otherusers,currentuser]
    usersDb.setUsers(passing)
    // write in file
    await fspromises.writeFile(path.join(__dirname,"..","model",'users.json'),JSON.stringify(usersDb.users)),
    res.clearCookie('jwt',{httpOnly:true,maxAge:24*60*60*1000})
    res.sendStatus(204)
};

module.exports = { handlelogout };
