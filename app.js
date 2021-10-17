/**
 * @author David ROUMANET
 * @version 1.1.0
 * @description Modèle d'application MVC utisant Mongoose, Express, EJS... et un peu de JSDoc
 * La source originale du code est accessible sur https://www.c-sharpcorner.com/blogs/how-to-setup-mvc-design-pattern-in-express
 * Toutefois, le code a été fortement remanié sur certains aspects (pas de callback sur la partie modèle).
 * Cette version ajoute la sécurisation de l'application : HTTPS et Authentification JWT
 * Elle s'appuie sur le travail d'Étienne ROUZEAUD : https://etienner.github.io/api-json-web-token-authentication-jwt-sur-express-js/
 * 
 */

// mise en place des modules nécessaires pour l'application
const fs = require('fs')
const https = require('https')          // ajout flux sécurisé
const cors = require('cors')            // Cross Origin Resource Sharing
const morgan = require('morgan')        // logs pour authentification par token
const express  = require('express')  
const mongoose = require('mongoose')  
const path     = require('path')  
const defaultRoutes = require('./routes/defaultRoutes') 
const medecinsRoutes = require('./routes/medecinsRoutes')
const loginRoutes = require('./routes/loginRoutes')

// connexion à MongoDB (via framework Mangoose), base de données 'demoDB'
mongoose.connect('mongodb://localhost:27017/Hopital',{useNewUrlParser:true, useUnifiedTopology: true})  
.then(()=>console.log('connected to database Hopital')).catch(error=>console.log('error occured',error))  

// Initialisation de l'instance Express
const app = express()  

// Définitions des chemins par défaut des "vues" pour le client 
app.set("views",path.resolve(__dirname,'views'))
app.use(express.static("public"))

// Choix du moteur de rendu des vues : EJS 
app.set('view engine','ejs')  

// Utilisation des midlewares pour l'authentification
app.use(cors())
app.use(morgan('tiny'))

// Récupération des données encodée en X-WWW-...
app.use(express.urlencoded({extended: false}))  
//app.use(bodyParser.urlencoded({extended:false}))  

// Gestion des routeurs à utiliser en fonction de l'URL de départ
// note : on peut n'utiliser qu'un seul fichier de routes, le choix est ici de découper au maximum...
app.use('/medecins/', medecinsRoutes)
app.use('/login', loginRoutes)
app.use('/', defaultRoutes)
// lorsque toutes les solutions prévues ont été gérées... 404 ?
app.use('*', defaultRoutes)

// Définition du port de l'application  
const port = process.env.port || 3000;

// Définition des certificats pour le protocole HTTPS
const key = fs.readFileSync(path.join(__dirname, 'certificate', 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'server.cert'));
const options = { key, cert };


// DÉMARRAGE DE L'APPLICATION
https.createServer(options, app).listen(port, () => {
    console.log(`server running HTTPS. Go to https://localhost:${port}`);
  }); 

module.exports = app;