// call confirm method for env
require('dotenv').config();
const express=require('express')
const path=require('path');
const hbs=require('hbs');
require('./db/conn');
const Register=require('./models/registers');
const Product=require('./models/products');
const Customer=require('./models/customers');
const bcryptjs=require('bcryptjs');
const jwt=require("jsonwebtoken");
const cookieParser=require('cookie-parser');
const {auth,isseller,isbuyer}=require('./Middleware/authMiddleware');

const app=express();
const port=process.env.PORT||3000;


const static_path=path.join(__dirname,"../public");
const templates_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

// check .html file  and show it static website
app.use(express.static(static_path));
// dynamic website 
app.set("view engine","hbs")
app.set("views",templates_path);
hbs.registerPartials(partials_path);
// it is a middleware function in express js
// it is based on body parser
// it parse incoming body request 
// it make parsed json data available in req.body
// use when send data in json via POST request
// so we need to parse that data to access it in server side code

app.use(express.urlencoded({extended:false}));
// the above is a middle ware in express js application
//that parses incoming request with url encoded payload
// data sent through an html form
// extended false--> it uses the querystring library to parse the URL-encoded data, which does not support nested objects. 
app.use(express.json()); // ye hum apne app ko bata rhe h ki ye use krna hai
app.use(cookieParser());// bata rhe h app ko ki ye use kr rhe h
// to get data from form page


//environment variables



app.get('/',(req,res)=>
{
    res.render("hero");
});


app.get('/category',(req,res)=>{
    res.render('categories');
});


app.get('/about',(req,res)=>{
    res.render('about');
});


app.get('/contact',(req,res)=>{
    res.render('contact');
});

app.get('/buyitem',auth,(req,res)=>{
    res.render('buyitem');
});

app.get('/login',(req,res)=>{
    res.render("login");
});

app.get('/sellitem',auth,(req,res)=>{
    res.render("sellitem");
});

app.get('/signup',(req,res)=>{
    res.render("register")
});

app.get('/category/jewelry',async (req,res) => {
    try{
    const products=await Product.find({category:'Jewelry'});
    res.status(201).render('jewelrys',{products});
}catch(err){
    res.status(500).send("Error fetching jewelry product");
}

});

app.get('/category/home-decor',async(req,res)=>{
    try{
        const products=await Product.find({category:'Home Decor'});
        res.status(201).render('homedecors',{products});
        }
    catch(err){
        res.status(500).send("Error fetching Home Decor  product");
        }
});

app.get('/category/art-crafts',async(req,res)=>{
    try{
        const products=await Product.find({category:'Art & Crafts'});
        res.status(201).render('artcrafts',{products});
    }catch(err){
        res.status(500).send("Error fetching Art and Crafts product");
    }
});

app.get('/category/clay',async(req,res)=>{
    try{
        const products=await Product.find({category:'clay-Murtis'});
        res.status(201).render('clay',{products});
    }catch(err){
        res.status(500).send("Error fetching clay Murtis product");
    }
});

app.get('/category/painting',async(req,res)=>{
    try{
        const products=await Product.find({category:'Paintings'});
        res.status(201).render('painting',{products});
    }catch(err){
        res.status(500).send("Error fetching Painting  product");
    }
});

app.get('/category/ceramics',async(req,res)=>{
    try{
        const products=await Product.find({category:'Artisan Ceramics'});
        res.status(201).render('ceramics',{products});
    }catch(err){
        res.status(500).send("Error fetching Artisan and Ceramics product");
    }
});

/* *************REGISTRATION************* */
app.post('/signup', async(req,res)=>{
    try{
       const password=req.body.password;
       const confirmpassword=req.body.confirmpassword;
       if(password===confirmpassword)
        {
          const registercustomer=new Customer({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            confirmpassword:req.body.confirmpassword,
            role:req.body.role

          });
  
            /**Middle ware to generate token */
          // generateAuthToken defined in customer.js
          const token= await registercustomer.generateAuthToken();
          // cookie function is used to set cookiename and value and options
          // value---> can be string , or object of json
            res.cookie("jwt",token,{
                // this is optional ---> that is expire
             //  expires:new Date(Date.now()+70000),// in milli seconds
                httpOnly:true // client side scrpiting langugue (js) cannot change cookie value
            });
            console.log(`this is cookie: ${req.cookies.jwt}`);
         
          /**middle ware hash the password  in model register.js/ customer.js  file  */
            await registercustomer.save();
                  
         res.status(201).render("hero");
        }
        else
        {
            res.send("Password not match");
        }
    }  
    catch(err){
      res.status(400).send(err);
    }
});

/****************LOGIN VALIDDATION**************** */
app.post('/login',async(req,res)=>{
    try{
        
       const email=req.body.email;
       const password=req.body.password;
      const useremail= await Customer.findOne({email:email});
      if(useremail){
        const token= await useremail.generateAuthToken();
        const ismatch=await bcryptjs.compare(password,useremail.password);
        console.log(token);
        res.cookie("jwt",token,{
            // this is optional ---> that is expire
         //  expires:new Date(Date.now()+70000),// in milli seconds
            httpOnly:true // client side scrpiting langugue (js) cannot change cookie value
        });
        if(ismatch)
        {
            res.status(201).render("hero");
        }
        else
        {
            res.send("Password are not matching");
        }
    }
        else{
            res.send("Email not found");
        }
    }catch(error){
           res.status(400).send("error occur ");
    }
});
/*** sell item send to db */
app.post('/sellitem', auth,isseller, async (req, res) => {
    try {
        // Create a new product instance using your Product model
        const newProduct = new Product({
            title:req.body.title,
            description:req.body.description,
            category:req.body.category,
            price:req.body.price,
            imageUrl:req.body.imageUrl
        });
    
        // Save the product to the database
        await newProduct.save();

        // Redirect to a success page or home page
        res.status(201).render("hero");// Redirect to home page or another relevant page
    } catch (err) {
        console.error('Error submitting product:', err);
        res.status(500).send('Error submitting product');
    }
});
/** Search products */
app.get('/search',async (req,res)=>{
    const query=req.query.query;
    try{
     const products=await Product.find({$text:{$search:query}})
       
        res.render('searchresult',{products});
    }catch(err){
        res.status(400).send("not found");
    }
})
/** capitalize each letter of a word */
hbs.registerHelper('capitalizeFirstLetter', function(title) {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
});

/********************AUTHENTICATION***************************** */
app.listen(port,()=>
{
  console.log(`listening at port ${port}`)
});
