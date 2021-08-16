/**
 * @author David ROUMANET
 * @version 1.0.0
 * @description Ce fichier contient les fonctions liées au modèle de données des médecins
*/
const mongoose  = require('mongoose')  

// Indique les champs (et les types) utilisés dans la collection de MongoDB.
// Types : String, Number, Date, Boolean, Array, Decimal128, Buffer, ObjectId, Map
const medecinSchema = new mongoose.Schema({  
	nom       : { type: String,  uppercase: true, required: true},
	specialite: String,  
	ville     : String,  
	CP        : Number,
	telephone :  {fixe : String, mobile: String}
})  

//here we saving our collectionSchema with the name medecin in database  
//medecinModel will contain the instance of the medecin for manipulating the data.  
const medecinModel = module.exports = mongoose.model('medecins',medecinSchema)  

//this function will find all the medecin   
//there will be just a callback parameter  
async function getmedecin() {  
	let data = await medecinModel.find()
	return data  
}  

//this will add new medecin to the medecin collection  
//this will take 2 parameter.newmedecin is object and cb is a callback  
async function addmedecin (newmedecin) {  
	const medecin = new medecinModel({  
		nom:newmedecin.nom,  
		specialite:newmedecin.specialite,  
		ville:newmedecin.ville,  
		CP:newmedecin.CP,  
		telephone:newmedecin.telephone   
	})  
	return medecin.save()  
}  

async function findmedecin (medecinID) {  
	let id = {_id : medecinID}
	return  medecinModel.findOne(id) 
} 

async function editmedecin (newmedecin) {  
	const medecin = new medecinModel({  
		nom:newmedecin.nom,  
		specialite:newmedecin.specialite,  
		ville:newmedecin.ville,  
		CP:newmedecin.CP,  
		telephone:newmedecin.telephone   
	})  
	const id = newmedecin.id
	console.log("ID:", id, "medecin:", medecin)
	return medecinModel.findByIdAndUpdate(id, medecin)
}  

async function deletemedecin(medecin) {  
	return medecinModel.findByIdAndDelete(medecin) 
}  

module.exports = {
	getmedecin,
	addmedecin,
	findmedecin,
	editmedecin,
	deletemedecin
}