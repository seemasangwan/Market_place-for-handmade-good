const mongoose=require('mongoose');
mongoose.connect(process.env.SECRET_DB_NAME).then(()=>{
    console.log("connection successfull")
}).catch((err)=>{
    console.log("connection fail")
});
