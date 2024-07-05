const mongoose=require('mongoose');

mongoose.connect(process.env.SECRET_DB_NAME).then(()=>{
    console.log("Atlas connected")
}).catch((err)=>{
    console.log("not connected")
});
