var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.positions = [
		{
			current: true,
			startDate : '01/2016',
			endDate : undefined,
			company : 'ALAUD',
			role : 'Creative Technologist',
			description: "Working closely with the production team to develop highly innovative world first campaigns for Calvin Klein's #mycalvins campaign."
		},
		{
			current: true,
			startDate : '04/2015',
			endDate : undefined,
			company : 'BitStew',
			role : 'Senior UX Developer',
			description: "Transforming and Architecting the core product from both visual and technical facets from engineers tool to beautiful platform."
		}
	]
	
	// Render the view
	view.render('index');
	
};
