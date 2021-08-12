var mongoose  = require('mongoose')  

//specify the fields which we want in our collection(table).  
var medecinSchema = new mongoose.Schema({  
	firstname : String,  
	lastname  : String,  
	city      : String,  
	state     : String,  
	country   : String  
})  

//here we saving our collectionSchema with the name user in database  
//userModel will contain the instance of the user for manipulating the data.  
var userModel = module.exports = mongoose.model('user',medecinSchema)  

//this function will find all the user   
//there will be just a callback parameter  
async function getUser() {  
	let data = await userModel.find()
	console.log("AWAIT GETUSER = ",data)
	console.debug("----------------------------------------")
	return data  
}  

//this will add new user to the user collection  
//this will take 2 parameter.newUser is object and cb is a callback  
async function addUser (newUser) {  
	const user = new userModel({  
		firstname:newUser.firstname,  
		lastname:newUser.lastname,  
		city:newUser.city,  
		state:newUser.state,  
		country:newUser.country   
	})  
	return user.save()  
}  

async function findUser (userID) {  
	let id = {_id : userID}
	console.log("findUSER: ", id)
	return  userModel.findOne(id) 
} 

async function editUser (newUser) {  
	const user = { 
		firstname:newUser.firstname,  
		lastname:newUser.lastname,  
		city:newUser.city,  
		state:newUser.state,  
		country:newUser.country   
	}  
	const id = newUser.id
	console.log("ID:", id, "USER:", user)
	return userModel.findByIdAndUpdate(id, user)
}  

async function deleteUser(user) {  
	return userModel.findByIdAndDelete(user) 
}  

module.exports = {
	getUser,
	addUser,
	findUser,
	editUser,
	deleteUser
}