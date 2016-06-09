var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Portfolio Model
 * =============
 */

var Portfolio = new keystone.List('Portfolio', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Portfolio.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	heroImage: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages }
});

Portfolio.register();
