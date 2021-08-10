
//contain instance of user model  
var userModel = require('../models/userModel');  

//containt the function with business logics
var usersController={  
	userHome(req,res){  
		//this will call the getuser function present in user.js   
		userModel.getUser((err,data)=>{  
			try {  
				if(err){  
					console.log(err)  
				}     
				else if(data){  
					res.render('userHome',{data:data})  
				}  
				else{  
					res.render('userHome',{data:{}})  
				}  
				} catch (error) {  
				console.log(error)  
			}  
		})  
	},  
	addUsers(req,res){  
		try {  
			console.log('adduser',req.body)  
            const user = {  
                firstname:req.body.firstname,  
                lastname:req.body.lastname,  
                city:req.body.city,  
                state:req.body.state,  
                country:req.body.country  
			};   
			//this will call the adduser function present in user.js.  
			//it will take object as parameter.   
			userModel.addUser(user,(err,data)=>{  
				if(err){  
					console.log('error occured',err)  
				}  
				else{  
					console.log(data)  
					res.redirect('/user/userHome')  
				}  
			})  
		}  
		catch (error) {  
			console.log('error',error)      
		}  
	},
	editUser(req,res){  
		try {  
			console.log('edituser',req.body)  

			//this will call the adduser function present in user.js.  
			//it will take object as parameter.   
			userModel.editUser(req.params.id,(err,data)=>{  
				if(err){  
					console.log('error occured',err)  
				}  
				else{  
					console.log(data)  
					res.redirect('/user/userHome')  
				}  
			})  
		}  
		catch (error) {  
			console.log('error',error)      
		}  
	},
	deleteUser(req,res){  
		try {  
			console.log('deleteuser',req.body)  
			//this will call the deleteuser function present in Models\user.js.  
			//it will take object as parameter.   
			userModel.deleteUser(req.params.id,(err,data)=>{  
				if(err){  
					console.log('error occured',err)  
				}  
				else{  
					console.log("info: ",data)  
					res.redirect('/user/userHome')  
				}  
			})  
		}  
		catch (error) {  
			console.log('error',error)      
		}  
	}	   
	
}  

module.exports = usersController;  
