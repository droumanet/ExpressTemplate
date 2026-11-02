import express from 'express'
import defaultController from '../controllers/defaultController.js'

// express.Router is a class to create route handlers  
//router will contain the Router instance.  
const router = express.Router()

//this route will be executed on /user/home request  
//userHome function will be called from the controller when request come for this route.  
router.get('/', defaultController.Home)
router.get('*', defaultController.Error)

export default router