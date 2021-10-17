/**
 * @author David ROUMANET
 * @version 1.1.0
 * @description Ce fichier ne contient que les sous-routes pour le chemin /login/
*/

const loginCtrl = require('../controllers/loginControllers')
const express =  require('express')
// Instantiation du router pour permettre la gestion des requêtes HTTP (get, post, etc.)  
const router = express.Router() 

// Une authentification se passe par méthode POST
router.post('/',loginCtrl.login)  


// exportation du module (pour le rendre utilisable dans un autre fichier)
module.exports = router 