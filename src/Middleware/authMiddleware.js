const jwt=require('jsonwebtoken');
const Customer=require('../models/customers');
const cookieParser=require('cookie-parser');
const auth=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        // "customersabuerandseller"--->It is secure key to generate token
        // give name to it and paste it in env
        // token wo hai jo hum get kr rhe hai cookies se
        // and jo data base token hai wo secret key se gett krenge
        const verifyuser=jwt.verify(token,process.env.SECRET_KEY);
        const user=await Customer.findOne({_id:verifyuser._id,'tokens.token':token});
        if(!user)
            {
                throw new Error();
            }
            req.token=token;
            req.user=user;
            next();

    }catch(error){
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

const isseller=(req,res,next)=>{
    if(req.user && req.user.role==="Seller")
        {
         next();
        }
       else{
        return res.status(403).send({error:"Access denied"});
       }
}
const isbuyer=(req,res,next)=>{
    if(req.user && req.user.role==='Buyer')
        {
            next();
        }
        else
       { return res.status(403).send({error:"Access denied"});}
};

module.exports={auth,isseller,isbuyer};