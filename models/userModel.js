var mongoose  = require('mongoose')  
// const { deleteUser } = require('../controllers/userController')

//specify the fields which we want in our collection(table).  
var userSchema = new mongoose.Schema({  
	firstname : String,  
	lastname  : String,  
	city      : String,  
	state     : String,  
	country   : String  
})  

//here we saving our collectionSchema with the name user in database  
//userModel will contain the instance of the user for manipulating the data.  
var userModel = module.exports = mongoose.model('user',userSchema)  

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

async function deleteUser(user) {  
	return userModel.findByIdAndDelete(user) 
}  

module.exports = {
	getUser,
	addUser,
	deleteUser
}