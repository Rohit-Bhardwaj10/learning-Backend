const {format} = require('date-fns')
const {v4:uuid} = require('uuid')

console.log(format(new Date(), 'yyyy-MM-dd\tHH:mm:ss'));

console.log(uuid());
 
// events & eventlogs
const fs= require('fs')
const path = require('path')
const fspromises= require('fs').promises

const logEvents = async (msg) =>{
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')} \t${uuid()}\t${msg}\n`
    console.log(dateTime);
   
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fspromises.mkdir(path.join(__dirname, "logs"))
        }
        await fspromises.appendFile(path.join(__dirname, "logs", "events.txt"), dateTime)
    } catch (error) {
        console.error(error);
    }   
}

module.exports = logEvents;