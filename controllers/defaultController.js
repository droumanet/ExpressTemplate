// contains the function with business logics
const defaultController = {
	Home(req, res) {
		res.render('main');
	},

	Error(req, res) {
		res.render('404');
	}
}

export default defaultController;