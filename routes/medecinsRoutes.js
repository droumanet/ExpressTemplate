
// This file manage all routes for /medecins/
// --------------------------------------

var express =  require('express');  
var medecinCtrl = require('../controllers/medecinsCtrl');  

// express.Router is a class to create route handlers  
//router will contain the Router instance.  
var router = express.Router();  

//this route will be executed on /user/home request  
//userHome function will be called from the controller when request come for this route.  
router.get('/home',medecinCtrl.homeMedecin)  

//this route will be executed on /user/add  
//addUsers function will be called from the controller when request come for this route.  
router.post('/add',medecinCtrl.addMedecin)  

//this route will be executed on /user/edit 
//editUser function will be called from the controller when request come for this route.  
router.get('/edit/:id',medecinCtrl.showMedecin)
router.post('/edit/',medecinCtrl.editMedecin)   

//this route will be executed on /user/delete
//deletetUser function will be called from the controller when request come for this route.  
router.get('/delete/:id',medecinCtrl.deleteMedecin)  

module.exports = router;  
