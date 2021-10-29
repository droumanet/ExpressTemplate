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
    // récupération de la chaine du token après le mot clé 'bearer'
    extractToken: (headerValue) => {
        if (typeof headerValue !== 'string') {
            return false
        }

        let TblAuthorization = headerValue.match(/(bearer)\s+(\S+)/i)  // expression régulière pour isoler bearer et le token
        return TblAuthorization && TblAuthorization[2]
    },

    checkToken: (req, res, next) => {
        let headerAuthorization = req.headers['authorization']
        let token = headerAuthorization && extractToken(headerAuthorization)
        if (!token) {
            return res.status(401).json({message:"Token non trouvé"})
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({message:"Token erroné"})
            } else {
                return next()
            }
        })
    },

    // vérification du cookie contenant le jeton JWT
    checkCookieJWT: (req, res, next) => {
        let token = req.cookies.access_token
        if (!token) {
            return res.sendStatus(403).json({message: "erreur, cookie ou token introuvable"})
        }
        try {
            let data = jwt.verify(token, process.env.TOKEN_SECRET)
            return next()
        } catch{
            return res.sendStatus(403).json({message: "erreur : vérification token impossible"})
        }
    }
}