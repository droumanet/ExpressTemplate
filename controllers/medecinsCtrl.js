/**
 * @author David ROUMANET
 * @version 1.0.0
 * @description Le contrôleur de la partie Médecins. En fonction de la route choisie, le contrôleur exécute les actions ci-dessous.
 */

// Définir une instance du modèle 'medecinModel'
const medecinModel = require('../models/medecinModel');

// Liste des fonctions liées à la logique métier
const usersController = {

	
	/**
	 * Fonction permettant d'afficher la liste des médecins
	 * @param {*} req 
	 * @param {*} res 
	 */
	async homeMedecin(req, res) {
		try {
			let data = await medecinModel.getUser()
			if (data) {
				res.render('medecinHome', { data: data })
			} else {
				res.render('medecinHome', { data: {} })
			}
		} catch (error) {
			console.log(error)
		}
	},

	// Fonction permettant l'ajout d'un médecin (méthode POST)
	async addMedecin(req, res) {
		try {
			// Les données sont récupérées dans le corps de la requête
			const user = {
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				city: req.body.city,
				state: req.body.state,
				country: req.body.country
			};
			if (user.firstname != "" & user.lastname != "" & user.city != "") {
				// on transmet le nouvel utilisateur à la fonction 'addUser' dans le modèle 
				let data = await medecinModel.addUser(user)
				if (data) {
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
	async showMedecin(req, res) {
		try {
			let data = await medecinModel.findUser(req.params.id)
			
			//this will call the adduser function present in user.js.  
			//it will take object as parameter.   
			if (data) {
				res.render('medecinEdit', data) 
			} else {
				res.render('medecinEdit', {})
			}
		}
		catch (error) {
			console.log('error', error)
		}
	},
	
	// Fonction permettant d'éditer un profil (par son ID)
	async editMedecin(req, res) {
		try {
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
			let data = await medecinModel.editUser(user)
			if (data) {
				console.log(data)
				res.redirect('/user/Home')
			}
		}
		catch (error) {
			console.log('error', error)
		}
	},
	async deleteMedecin(req, res) {
		try {
			//this will call the deleteuser function present in Models\user.js.  
			//it will take object as parameter.   
			let data = await medecinModel.deleteUser(req.params.id)
			if (data) {
				res.redirect('/user/home')
			}
		}
		catch (error) {
			console.log('error', error)
		}
	}

}

module.exports = usersController;
