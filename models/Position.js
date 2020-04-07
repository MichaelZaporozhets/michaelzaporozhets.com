var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Position Model
 * =============
 */

var Position = new keystone.List('Position', {
	map: { name: 'role' }
});

Position.add({
  current: { type: Types.Boolean, initial: true },
  startDate: { type: Types.Date, required: true, initial: true },
  endDate: { type: Types.Date, initial: true },
  company: { type: String, required: true , initial: true},
  role: { type: String, required: true, initial: true },
  description: { type: Types.Textarea, initial: true },
  richDescription: { type: Types.Markdown, initial: true },
});


Position.defaultColumns = 'role, company';
Position.defaultSort = '-startDate';
Position.register();
