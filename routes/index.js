var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.all('/', routes.views.index);
	app.post('/contact', routes.views.index);

	app.get('/portfolio/:post', routes.views.post);

	//hishtory
	app.get("/:dir", function(req, res){
		res.redirect('/#!/'+req.params.dir);
	});
};