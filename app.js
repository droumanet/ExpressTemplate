/**
 * @author David ROUMANET
 * @version 1.0.0
 * @description Modèle d'application MVC utisant Mongoose, Express, EJS... et un peu de JSDoc
 * La source originale du code est accessible sur https://www.c-sharpcorner.com/blogs/how-to-setup-mvc-design-pattern-in-express
 * Toutefois, le code a été fortement remanié sur certains aspects (pas de callback sur la partie modèle).
 */

const express  = require('express')  
const mongoose = require('mongoose')  
const path     = require('path')  
const defaultRoutes = require('./routes/defaultRoutes') 
const medecinsRoutes = require('./routes/medecinsRoutes')   

// connexion à MongoDB (via framework Mangoose), base de données 'demoDB'
mongoose.connect('mongodb://localhost:27017/Hopital',{useNewUrlParser:true, useUnifiedTopology: true})  
.then(()=>console.log('connected to database Hopital')).catch(error=>console.log('error occured while onnecting to local DB',error))  

// Initialisation de l'instance Express
const app = express()  

// Définitions des chemins par défaut des "vues" pour le client 
app.set("views",path.resolve(__dirname,'views'))
app.use(express.static("public"))

// Choix du moteur de rendu des vues : EJS 
app.set('view engine','ejs')  

//fetch form data from the request
app.use(express.urlencoded({extended: false}))  
//app.use(bodyParser.urlencoded({extended:false}))  

// Gestion des routeurs à utiliser en fonction de l'URL de départ
// note : on peut n'utiliser qu'un seul fichier de routes, le choix est ici de découper au maximum...
app.use('/medecins/', medecinsRoutes)
app.use('/', defaultRoutes)
// lorsque toutes les solutions prévues ont été gérées... 404 ?
app.use('*', defaultRoutes)

// Définition du port de l'application  
const port = process.env.port || 3000;  

// DÉMARRAGE DE L'APPLICATION
app.listen(port,()=>console.log(`server running at port ${port}`))  

module.exports = app;
