const fs = require('fs')

// fs.mkdir('./new',(err)=>{
//     if (err) throw err;
//     console.log('directory created');
// })

// if the directory alreadt exists
if(!fs.existsSync('./new')) {
    fs.mkdir('./new',(err)=>{
        if (err) throw err;
        console.log('directory created');
    })
}


// removing if exists
if(fs.existsSync('./new')){
    fs.rmdir('./new',(err)=>{
        if (err) throw err;
        console.log('directory removed');
    })
}
