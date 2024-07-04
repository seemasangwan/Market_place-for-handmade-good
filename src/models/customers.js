const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const customerschema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
    ,password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Buyer','Seller'],
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});
// middle ware to hash passowrd
customerschema.pre("save",async function (next) {
    if(this.isModified("password"))
        {
            this.password=await bcryptjs.hash(this.password,10);
            this.confirmpassword=await bcryptjs.hash(this.confirmpassword,10);
        }
        next();
})
// method to generate auth token
customerschema.methods.generateAuthToken=async function(){
    try{
        const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(error){
        resizeBy.send("error is occur"+error);
    }
};

const Customer=new mongoose.model("Customer",customerschema);
module.exports=Customer;