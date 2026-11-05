// Contient la logique nécessaire à l'authentification 
import jwt from 'jsonwebtoken';     // ajout token sécurisé
import cookieParser from 'cookie-parser'

const SECRET = 'AppKey'             // à mettre en fichier de conf. Plus tard

const loginController={  

    formLogin(req, res) {
        console.log("Affiche authentification")
        res.render('authentification')
    },

	login(req,res){ 
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: `Erreur authentif.` })
        }

        // Simulation d'un utilisateur (normalement géré dans une BDD)
        if (req.body.username == "admin" && req.body.password =="azerty123") {
            console.log("création token")

            // Création du jeton JWT
            const token = jwt.sign(
                { id: 0, username: req.body.username},
                SECRET,
                { expiresIn: '120s'}
            )

            // Création du cookie contenant le jeton JWT
            res.cookie('access_token', token, {
                httpOnly: true,     // cookie lisible uniquement par le serveur
                secure: false,      // cookie sécurisé uniquement via HTTPS
                sameSite: 'lax',    // l'option lax sécurise contre les attaques CSRF
                maxAge:120_000,     // même durée que le jeton
            })

            return res.render('main')
        } else {
            return res.status(400).json({ message: `Erreur D'authentif.` })
        }
	},

	Error(req, res) {
		res.render('404')
	}
}  

export default loginController