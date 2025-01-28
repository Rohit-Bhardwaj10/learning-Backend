// ------------------Node.js--------------------//
// console.log("hello world");
// console.log(global); //global object is the global object in Node.js

// it has common core modules instaed of es6 module
// to import these we use require(module)

const os = require("os");
// console.log("Total Memory:",os.totalmem());
// console.log("Free Memory:",os.freemem());
// console.log(os.version());

// const path =require("path");
// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));

// importing modules from different files
const math = require("./Math");
// console.log(math.add(2,3));

// ==>> missing some js apis like fetch

// using file read module
const fs = require("fs");
const path = require("path");

// reading the file
// fs.readFile(
//   path.join(__dirname, "files", "sample1.txt"),
//   "utf-8",
//   (err, data) => {
//     //instead of hardcoding path use path module.

//     if (err) throw err;
//     console.log(data); 
//   }
// );

// making (writing in a file)
// fs.writeFile(path.join(__dirname,"files","new.txt"),"this is the new file created",(err)=>{
//     if (err) throw err;
//     console.log("write complete");
// })

// //appending a file
// fs.appendFile(path.join(__dirname,"files","new.txt"),"adding this text",(err)=>{
//     if (err) throw err
//     console.log("append complete");

// })

// // renaming a file
// fs.rename(path.join(__dirname,"files","new.txt"),path.join(__dirname,"files","changed.txt"),(err)=>{
//     if (err) throw err;
//     console.log("renamed");
// })



// // we can also control the flow of ops here
// fs.writeFile(
//   path.join(__dirname, "files", "new.txt"),
//   "this is the new file created",
//   (err) => {
//     if (err) throw err;
//     console.log("write complete");

//     fs.appendFile(
//       path.join(__dirname, "files", "new.txt"),
//       "adding this text",
//       (err) => {
//         if (err) throw err;
//         console.log("append complete");

//         fs.rename(
//           path.join(__dirname, "files", "new.txt"),
//           path.join(__dirname, "files", "changed.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("renamed");
//           }
//         );
//       }
//     );
//   }
// );


// but this kinda became the callback hell!!
// using promises
const fsPromises=require("fs").promises;

const fileops = async () => {
    try {
    const data = await fsPromises.readFile(path.join(__dirname,"files","sample1.txt"),'utf-8')
    console.log(data);
    await fsPromises.writeFile(path.join(__dirname,"files","promise.txt"),data)
    } catch (error) {
        console.error(error)
    }
}

fileops()


// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error(`error ${err}`);
  process.exit(1);
});

//===>> readfile and methods we find in node in general are asynchronous..
