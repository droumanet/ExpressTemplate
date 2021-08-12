/**
 * @author David ROUMANET
 * @version 1.0.0
 * @description Le contrôleur de la partie Médecins. En fonction de la route choisie, le contrôleur exécute les actions ci-dessous.
 */
// Définir une instance du modèle 'userModel'
const userModel = require('../models/userModel');

// Liste des fonctions liées à la logique métier
const usersController = {

	// Fonction permettant d'afficher la liste des médecins
	async userHome(req, res) {
		try {
			let data = await userModel.getUser()
			console.log("►►► RESULTAT GETUSER CONTROLLER : ", data)
			if (data) {
				res.render('userHome', { data: data })
			} else {
				res.render('userHome', { data: {} })
			}
		} catch (error) {
			console.log(error)
		}
	},

	// Fonction permettant l'ajout d'un médecin (méthode POST)
	async addUsers(req, res) {
		try {
			// Les données sont récupérées dans le corps de la requête
			console.log('adduser', req.body)
			const user = {
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				city: req.body.city,
				state: req.body.state,
				country: req.body.country
			};
			if (user.firstname != "" & user.lastname != "" & user.city != "") {
				// on transmet le nouvel utilisateur à la fonction 'addUser' dans le modèle 
				let data = await userModel.addUser(user)
				if (data) {
					console.log("Résultat Ajout : ", data)
					res.redirect('/user/home')
				}
				else {
					console.log('error occured', err)
				}
			} else {
				// prévoir un message d'erreur, mais surtout revenir à la page initiale
				res.redirect('/user/home')
			}
		}
		catch (error) {
			console.log('error', error)
		}
	},

	// Fonction affichant le formulaire d'édition d'un profil (par son ID)
	async showUser(req, res) {
		try {
			let data = await userModel.findUser(req.params.id)
			
			//this will call the adduser function present in user.js.  
			//it will take object as parameter.   
			if (data) {
				console.log("Rendu vers editHome : ", data)
				let dataJSON = JSON.stringify(data)
				console.log("Rendu vers editHome : ", dataJSON)
				res.render('editHome', data)  // debug réussi avec {reponse: "OK"}
			} else {
				data.check = "BAD"
				res.render('editHome', { reponse: {} })
			}
		}
		catch (error) {
			console.log('error', error)
		}
	},
	
	// Fonction permettant d'éditer un profil (par son ID)
	async editUser(req, res) {
		try {
			console.log('edituser', req.body.id)
			const user = {
				id:req.body.id,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				city: req.body.city,
				state: req.body.state,
				country: req.body.country
			};
			//this will call the adduser function present in user.js.  
			//it will take object as parameter.   
			let data = await userModel.editUser(user)
			console.log("RESULT showUSER : ", data)
			if (data) {
				console.log(data)
				res.redirect('/user/Home')
			}
		}
		catch (error) {
			console.log('error', error)
		}
	},
	async deleteUser(req, res) {
		try {
			console.log('Demande : deleteuser', req.body)
			//this will call the deleteuser function present in Models\user.js.  
			//it will take object as parameter.   
			let data = await userModel.deleteUser(req.params.id)
			if (data) {
				console.log("Retour : ", data)
				res.redirect('/user/home')
			}
		}
		catch (error) {
			console.log('error', error)
		}
	}

}

module.exports = usersController;
