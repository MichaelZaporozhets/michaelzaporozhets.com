var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Recommendation Model
 * =============
 */

var Recommendation = new keystone.List('Recommendation', {
	map: { name: 'name' }
});

Recommendation.add({
  name: { type: Types.Name, required: true, initial: true },
  role: { type: String, required: true, initial: true },
  company: { type: String, required: true, initial: true },
  when: { type: Types.Date, required: true, initial: true },
  said: { type: Types.Textarea, required: true, initial: true }
});


Recommendation.defaultColumns = 'role, company';
Recommendation.defaultSort = '-when';
Recommendation.register();
