
// This file manage all routes for /user/
// --------------------------------------

var express =  require('express');  
var userControler = require('../controllers/userController');  

// express.Router is a class to create route handlers  
//router will contain the Router instance.  
var router = express.Router();  

//this route will be executed on /user/home request  
//userHome function will be called from the controller when request come for this route.  
router.get('/home',userControler.userHome)  

//this route will be executed on /user/add  
//addUsers function will be called from the controller when request come for this route.  
router.post('/add',userControler.addUsers)  

//this route will be executed on /user/edit 
//editUser function will be called from the controller when request come for this route.  
router.get('/edit/:id',userControler.editUser)  

//this route will be executed on /user/delete
//deletetUser function will be called from the controller when request come for this route.  
router.get('/delete/:id',userControler.deleteUser)  

module.exports = router;  
