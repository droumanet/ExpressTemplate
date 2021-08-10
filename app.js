var express  = require('express')  
var mongoose = require('mongoose')  
var path     = require('path')  
var bodyParser = require('body-parser')  
var userRoutes = require('./routes/usersRoutes')  
var defaultRoutes = require('./routes/defaultRoutes')  

//connecting to database  
//demoDB is the name of database  
mongoose.connect('mongodb://localhost:27017/demoDB',{useNewUrlParser:true, useUnifiedTopology: true})  
.then(()=>console.log('connected to database')).catch(error=>console.log('error occured',error))  

//initializing the object instance  
var app = express()  

//setting the path of our views folder  
app.set("views",path.resolve(__dirname,'views'))
app.use(express.static("public"))

//setting the template engine  
app.set('view engine','ejs')  

//fetch form data from the request  
app.use(bodyParser.urlencoded({extended:false}))  

//the request having /user/ will be send to the userRoutes module.  
//in that the rquest will be directed to the specific route.   
app.use('/user/',userRoutes);  
app.use('/', defaultRoutes);
//setting the port for the server.  
var port = process.env.port || 3000;  

//showing the port on which server is running  
app.listen(port,()=>console.log(`server running at port ${port}`))  

module.exports = app;  
