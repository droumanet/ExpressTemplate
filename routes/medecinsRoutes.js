/**
 * @author David ROUMANET
 * @version 1.0.0
 * @description Ce fichier ne contient que les sous-routes pour le chemin /medecins/
 */

import medecinCtrl from '../controllers/medecinsCtrl.js'
import express from 'express'

// Instantiation du router pour permettre la gestion des requêtes HTTP (get, post, etc.)  
const router = express.Router()

// liste des routes (attention à l'ordre). Pour la suppression d'un médecin, on n'utilise pas router.delete parce
// qu'un formulaire HTML5 ne propose que les méthodes GET et POST.
router.get('/home', medecinCtrl.homeMedecin)
router.post('/add', medecinCtrl.addMedecin)
router.get('/edit/:id', medecinCtrl.showMedecin)
router.post('/edit/', medecinCtrl.editMedecin)
router.get('/delete/:id', medecinCtrl.deleteMedecin)

// exportation du module (pour le rendre utilisable dans un autre fichier)
export default router

