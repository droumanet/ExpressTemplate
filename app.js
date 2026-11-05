/**
 * @author David ROUMANET
 * @version 2.0.0
 * @description Modèle d'application MVC utilisant MySQL, Express, EJS... et un peu de JSDoc
 * La source originale du code est accessible sur https://www.c-sharpcorner.com/blogs/how-to-setup-mvc-design-pattern-in-express
 * Toutefois, le code a été fortement remanié sur certains aspects (pas de callback sur la partie modèle, migration MySQL).
 */

import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import defaultRoutes from './routes/defaultRoutes.js'
import medecinsRoutes from './routes/medecinsRoutes.js'
import loginRoutes from './routes/loginRoutes.js'
import authentificationRights from './middlewares/authentificationRights.js'
import pool from './models/db.js'

import fs from 'node:fs'
import https from 'node:https'

// __dirname n'existe pas nativement en ES6 (modules), on le recrée manuellement
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const key = fs.readFileSync(path.join(__dirname, 'certificate', 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'server.cert'));
const options = { key, cert };

// Vérification de la connexion MySQL au démarrage (non utilisé pour les requêtes)
pool.getConnection()
	.then(connection => {
		console.log('connected to database cabinet_medical')
		connection.release()
	})
	.catch(error => console.log('error occured while connecting to MySQL DB', error))

// Initialisation de l'instance Express
const app = express()

// Définitions des chemins par défaut des "vues" pour le client 
app.set("views", path.resolve(__dirname, 'views'))
app.use(express.static("public"))

// Choix du moteur de rendu des vues : EJS 
app.set('view engine', 'ejs')

//fetch form data from the request
app.use(express.urlencoded({ extended: false }))

// Gestion des routeurs à utiliser en fonction de l'URL de départ
app.use(cookieParser())
app.use('/login', loginRoutes);
app.use('/medecins/', authentificationRights.checkCookieJWT, medecinsRoutes)
app.use('/', defaultRoutes)
// lorsque toutes les solutions prévues ont été gérées... 404 ?
app.use('*', defaultRoutes)

// Définition du port de l'application  
const port = process.env.PORT || 3000

// DÉMARRAGE DE L'APPLICATION
app.listen(port, () => console.log(`server running HTTP at port ${port}`))
https.createServer(options, app).listen(port+1, () => {
    console.log(`server running HTTPS at https://localhost:${port+1}`);
  });

export default app
