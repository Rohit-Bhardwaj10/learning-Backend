const {format} = require('date-fns')
const {v4:uuid} = require('uuid')

console.log(format(new Date(), 'yyyy-MM-dd\tHH:mm:ss'));

console.log(uuid());
 
// events & eventlogs
const fs= require('fs')
const path = require('path')
const fspromises= require('fs').promises

const logEvents = async (msg,logName) =>{
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')} \t${uuid()}\t${msg}\n`
    console.log(dateTime);
   
    try {
        if(!fs.existsSync(path.join(__dirname,"..", 'logs'))){
            await fspromises.mkdir(path.join(__dirname, "..","logs"))
        }
        await fspromises.appendFile(path.join(__dirname, "..","logs", logName), dateTime)
    } catch (error) {
        console.error(error);
    }   
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
    console.log(`${req.method} ${req.path}`);
    next();
  }

module.exports = {logger,logEvents};