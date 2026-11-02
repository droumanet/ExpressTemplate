/**
 * @author David ROUMANET
 * @version 2.0.0
 * @description Modèle d'application MVC utilisant MySQL, Express, EJS... et un peu de JSDoc
 * La source originale du code est accessible sur https://www.c-sharpcorner.com/blogs/how-to-setup-mvc-design-pattern-in-express
 * Toutefois, le code a été fortement remanié sur certains aspects (pas de callback sur la partie modèle, migration MySQL).
 */

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import defaultRoutes from './routes/defaultRoutes.js'
import medecinsRoutes from './routes/medecinsRoutes.js'
import pool from './models/db.js'

// __dirname n'existe pas nativement en ES6 (modules), on le recrée manuellement
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
app.use('/medecins/', medecinsRoutes)
app.use('/', defaultRoutes)
// lorsque toutes les solutions prévues ont été gérées... 404 ?
app.use('*', defaultRoutes)

// Définition du port de l'application  
const port = process.env.PORT || 3000

// DÉMARRAGE DE L'APPLICATION
app.listen(port, () => console.log(`server running at port ${port}`))

export default app
