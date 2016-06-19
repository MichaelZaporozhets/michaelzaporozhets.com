var keystone = require('keystone');

/**
 * PortfolioPostTechnology Model
 * ==================
 */

var PortfolioPostTechnology = new keystone.List('PortfolioPostTechnology', {
	autokey: { from: 'name', path: 'key', unique: true }
});

PortfolioPostTechnology.add({
	name: { type: String, required: true }
});

PortfolioPostTechnology.relationship({ ref: 'Post', path: 'technologies' });

PortfolioPostTechnology.register();