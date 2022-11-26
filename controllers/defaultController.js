
//containt the function with business logics  
var defaultController={  
	Home(req,res){  
  	    res.render('main')  
	},

	Error(req, res) {
		res.render('404')
	}
}  

module.exports = defaultController; 