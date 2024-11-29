
//containt the function with business logics  
var defaultController={  
	Home(req,res){  
  	    res.render('main')  
	},

	Error(req, res) {
		res.render('404')
	},
	
	RobotScan(req, res) {
		res.type('text/plain')
		res.send("User-agent: *\nDisallow: /");
	}
}  

module.exports = defaultController; 