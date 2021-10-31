/*
 * Middleware pour le traitement du token JWT
 * Fonctionnement : 
 *   un première fonction permet d'extraire le token dans une chaine de caractères
 *   la deuxième fonction récupère la chaine dans l'entête, demande l'extraction puis valide le Token
*/
const dotenv = require('dotenv')
const jwt = require("jsonwebtoken")

dotenv.config()

module.exports = {
    // vérification du cookie contenant le jeton JWT
    checkCookieJWT: (req, res, next) => {
        let token = req.cookies.access_token
        // Si le token n'existe pas
        if (!token) {
            return res.render("main", {message: "erreur : le token n'existe pas."})
        }
        try {
            // Cas de l'authentification réussie : on passe au middleware suivant
            let data = jwt.verify(token, process.env.TOKEN_SECRET)
            console.log(data)
            return next()
        } catch{
            // Cas du cookie dépassé ou du token dépassé
            console.log("Token ou cookie dépassé")
            return res.render("main", {message: {type:"error", msg: "erreur : Veuillez vous authentifier."}})
        }
    }
}