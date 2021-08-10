var mongoose  = require('mongoose')  

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
module.exports.getUser=(cb)=>{  
	userModel.find((err,data)=>{  
		if(err){  
			console.log(err)  
		}  
		else{  
			cb(null,data)  
		}  
	})  
}  

//this will add new user to the user collection  
//this will take 2 parameter.newUser is object and cb is a callback  
module.exports.addUser=(newUser,cb)=>{  
	const user = new userModel({  
		firstname:newUser.firstname,  
		lastname:newUser.lastname,  
		city:newUser.city,  
		state:newUser.state,  
		country:newUser.country   
	})  
	user.save(cb)  
}  

module.exports.deleteUser=(user, cb)=>{  
	userModel.findByIdAndDelete(user, (err, data) => {
		if (err) {
			console.log(err)
		}
		else {
			console.log("Delete result: ", data)
			cb(null, data)
		}
	}) 
}  
