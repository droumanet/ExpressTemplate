import express from 'express';
import loginCtrl from '../controllers/loginControllers.js';

// Routeur pour gérer les requêtes HTTP
const router = express.Router();

// L’authentification se fait par POST
router.post('/', loginCtrl.login);
router.get('/', loginCtrl.formLogin)

export default router;