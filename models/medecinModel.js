/**
 * @author David ROUMANET
 * @version 1.0.0
 * @description Ce fichier contient les fonctions liées au modèle de données des médecins
*/
const mongoose = require('mongoose')

/**  GÉNÉRER LE SCHÉMA DE LA COLLECTION
	 Indique les champs (et les types) utilisés dans la collection de MongoDB.
	 Types : String, Number, Date, Boolean, Array, Decimal128, Buffer, ObjectId, Map
*/
const medecinSchema = new mongoose.Schema({
	nom: { type: String, uppercase: true, required: true },
	specialite: String,
	ville: { type: String, uppercase: true },
	CP: Number,
	telephone: { fixe: String, mobile: String }
})
// On rend le modèle disponible (export) pour les fonctions qui veulent utiliser l'objet 'medecin'
const medecinModel = module.exports = mongoose.model('medecins', medecinSchema)

/**
 * @description CREATE : Créer un nouveau médecin à la fin de la collection 
 * @param {medecinModel} newMedecin 
 * @returns {Object} la réponse de MongoDB à l'insertion du médecin
 */
async function addmedecin(newMedecin) {
	const medecin = new medecinModel({
		nom: newMedecin.nom,
		specialite: newMedecin.specialite,
		ville: newMedecin.ville,
		CP: newMedecin.CP,
		telephone: newMedecin.telephone
	})
	return medecin.save()
}

/**
 * @description READ : Lire tous les médecins 
 * @returns {Array} Une liste de médecins
 */
async function getmedecin() {
	return medecinModel.find()
}

/**
 * @description UPDATE : deux fonctions utiles, l'une pour trouver le médecin recherché...
 * @param {*} medecinID correspond à l'_id du médecin
 * @returns {medecinModel} Le premier médecin correspondant au critère de recherche
 */
async function findmedecin(medecinID) {
	let id = { _id: medecinID }
	return medecinModel.findOne(id)
}
/**
 * @description UPDATE : ...l'autre pour modifier le médecin édité, dans la base.
 * @param {medecinModel} newMedecin qui est l'ensemble des champs d'un médecin
 * @returns {Object} Le résultat de MongoDB pour la mise à jour
 */
async function editmedecin(newMedecin) {
	const medecin = new medecinModel({
		nom: newMedecin.nom,
		specialite: newMedecin.specialite,
		ville: newMedecin.ville,
		CP: newMedecin.CP,
		telephone: newMedecin.telephone
	})
	const id = newMedecin.id
	console.log("ID:", id, "medecin:", medecin)
	return medecinModel.findByIdAndUpdate(id, newMedecin)
}

/**
 * @description DELETE : la recherche et l'effacement existent dans une seule fonction
 * @param {*} medecinID correspond à l'_id du médecin à supprimer 
 * @returns {object} La réponse de MongoDB
 */
async function deletemedecin(medecinID) {
	return medecinModel.findByIdAndDelete(medecinID)
}

module.exports = {
	getmedecin,
	addmedecin,
	findmedecin,
	editmedecin,
	deletemedecin
}