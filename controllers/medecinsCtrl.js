/**
 * @author David ROUMANET
 * @version 1.0.0
 * @description Le contrôleur de la partie Médecins. En fonction de la route choisie, le contrôleur exécute les actions ci-dessous.
 */

// Définir une instance du modèle 'medecinModel'
const medecinModel = require('../models/medecinModel');

// Liste des fonctions liées à la logique métier : il s'agit d'un autre moyen d'exporter toutes les fonctions en une fois
const medecinsController = {
	
	/**
	 * Fonction permettant d'afficher la liste des médecins
	 * @param {*} req non utilisé
	 * @param {*} res réponse des données lues avec getmedecin()
	 */
	async homeMedecin(req, res) {
		try {
			let data = await medecinModel.getmedecin()
			if (data) {
				res.render('medecinHome', { data: data })
			} else {
				res.render('medecinHome', { data: {} })
			}
		} catch (error) {
			console.log(error)
		}
	},

	/**
	 * Fonction permettant l'ajout d'un médecin (méthode POST)
	 * @param {*} req requete permettant de récupérer les données
	 * @param {*} res réponse avec une redirection
	 */
	async addMedecin(req, res) {
		try {
			// Les données sont récupérées dans le corps de la requête
			const medecin = {
				nom: req.body.nom,
				specialite: req.body.specialite,
				ville: req.body.ville,
				CP: req.body.CP,
				telephone: req.body.telephone
			};
			if (medecin.nom != "" & medecin.specialite != "" & medecin.ville != "") {
				// on transmet le nouvel utilisateur à la fonction 'addmedecin' dans le modèle 
				let data = await medecinModel.addmedecin(medecin)
				if (data) {
					res.redirect('/medecins/home')
				}
				else {
					console.log('error occured', err)
				}
			} else {
				// prévoir un message d'erreur, mais surtout revenir à la page initiale
				res.redirect('/medecins/home')
			}
		}
		catch (error) {
			console.log('error', error)
		}
	},

	/**
	 * Fonction affichant le formulaire d'édition d'un profil (par son ID)
	 * @param {*} req requete permettant de récupérer l'ID dans l'URL
	 * @param {*} res réponse contenant le formulaire d'édition des données du médecin
	 */
	async showMedecin(req, res) {
		try {
			let data = await medecinModel.findmedecin(req.params.id)
			
			//this will call the addmedecin function present in medecin.js.  
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
			let telephones = {fixe: req.body.telephoneF, mobile: req.body.telephoneM}
			const medecin = {
				id:req.body.id,
				nom: req.body.nom,
				specialite: req.body.specialite,
				ville: req.body.ville,
				CP: req.body.CP,
				telephone: telephones
			};
			//this will call the addmedecin function present in medecin.js.  
			//it will take object as parameter.   
			let data = await medecinModel.editmedecin(medecin)
			if (data) {
				console.log(data)
				res.redirect('/medecins/Home')
			}
		}
		catch (error) {
			console.log('error', error)
		}
	},
	async deleteMedecin(req, res) {
		try {
			//this will call the deletemedecin function present in Models\medecin.js.  
			//it will take object as parameter.   
			let data = await medecinModel.deletemedecin(req.params.id)
			if (data) {
				res.redirect('/medecins/home')
			}
		}
		catch (error) {
			console.log('error', error)
		}
	}

}

module.exports = medecinsController;
