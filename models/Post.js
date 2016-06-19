var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, private, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	
	images: { type: Types.CloudinaryImages },
	content: {
		brief: { type: Types.Markdown, wysiwyg: true, height: 150 },
		purpose: { type: Types.Markdown, wysiwyg: true, height: 150 },
		involvement: { type: Types.Markdown, wysiwyg: true, height: 150 },
		technologies: { type: Types.Relationship, ref: 'PortfolioPostTechnology', many: true }
	},

	categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();