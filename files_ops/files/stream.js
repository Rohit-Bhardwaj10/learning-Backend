const fs = require("fs")

const rs =fs.createReadStream("./files/sample1.txt",{encoding:"utf8"});

const ws = fs.createWriteStream("./files/new-lorem.txt");

// rs.on('data', (datachunk)=>{
//     ws.write(datachunk);
// })
// or 
rs.pipe(ws);

rs.on('end', ()=>{
    console.log("File copied successfully");
})
