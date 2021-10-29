/**
 * 28/10 Ajout du fichier de configuration (module dotenv)
 */

// Contient la logique nécessaire à l'authentification 
const jwt = require('jsonwebtoken')     // ajout token sécurisé
const dotenv = require('dotenv')        // le secret y est stocké
dotenv.config()

var loginController={  
    // lorsque l'utilisateur doit saisir les identifiants pour s'authentifier
    formLogin(req, res) {
        console.log("Affiche authentification")
        res.render('authentification')
    },

    // vérification des identifiants et création éventuelle du token
	login(req,res){ 
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: `Erreur D'authentification. Vérifier l'identifiant et le mot de passe.` })
        }

        // Simulation d'un utilisateur géré dans une BDD
        if (req.body.username == "admin" && req.body.password =="azerty123") {
            const token = jwt.sign(
                { id: 0, username: req.body.username},
                process.env.TOKEN_SECRET,
                { expiresIn: '120s'}
            )
            // renvoit vers la page authSuccess et transmet  la "variable" access_token
            res.cookie("access_token", token, {httpOnly: true})
            .render('authSuccess', { access_token: token})
        } else {
            return res.status(400).json({ message: `Erreur D'authentification. Vérifier l'identifiant et le mot de passe.` })
        }
	},

	Error(req, res) {
		res.render('404')
	}
}  

module.exports = loginController; 