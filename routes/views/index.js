var keystone = require('keystone');
var async = require('async');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.positions = [
		{
			current: true,
			startDate : '05/2017',
			endDate : undefined,
			company : 'George Patterson, Y&R (Y&R ANZ)',
			role : 'Technical Lead',
			description: " \
				As lead for both pure technical and creative technology capacities at Y&R, my responsibilities are to: \
				Build and nurture a high-velocity development team, \
				Lead development of all digital output, \
				Develop best practises, workﬂows and frameworks for both local and national teams, \
				Work alongside creative/strategy departments in an advisory and ideation capacity, \
				Act as thought-leader and client-facing lead for all things technology"
		},
		{
			current: true,
			startDate : '01/2016',
			endDate : undefined,
			company : 'ALAUD',
			role : 'Creative Technologist',
			description: "At ALAUD, I act as a creative technology consultant in the video/brand production space. Helped develop key technologies for Calvin Klein's 2016 Fall Collection Launch and Desert Rave events."
		},
		{
			current: true,
			startDate : '04/2015',
			endDate : '05/2017',
			company : 'Bitstew/GE Digital',
			role : 'Senior UI/UX Developer',
			description: "I was brought on to refresh and architect a brand new user experience for Bitstew's MIX Director (Known now as Predix Studio), an Industrial IoT Visualisation and Management platform. From wireframes, through to finished designs to front end architecture, I helped lead each stage towards the eventual acquisition and integration into GE Digital's Predix software suite."
		},
		{
			current: false,
			startDate : '11/2014',
			endDate : '02/2015',
			company : 'Snow',
			role : 'Digital Creative Director',
			description: "Founded and ran a 'Creative Technology As a Service' (CTAAS) Agency. Creative Direction, Technical Leadership, Design and Development of all work being output. This was a /terrible/ idea, but there's nothing like trial by fire."
		},
		{
			current: false,
			startDate : '09/2014',
			endDate : '01/2015',
			company : 'REBORN, LOWE PROFERO, ZIPMENTS & BP PARTNERS',
			role : 'Misc. Contract Roles',
			description : "Front-end development and design for various projects"
		},
		{
			current: false,
			startDate : '04/2014',
			endDate : '01/2015',
			company : 'PRISMATIK',
			role : 'Head of Creative',
			description : "Creative Direction, Marketing strategy, Rapid Prototyping, Innovation research, Copywriting, UX and Branding"
		},
		{
			current: false,
			startDate : '09/2013',
			endDate : '04/2014',
			company : 'Edelman',
			role : 'Creative',
			description : "Copywriter, Video editor, animator, UX consult, concept artist, traditional artist, concept developer and pretty much everything else you can think of."
		},
		{
			current: false,
			startDate : '07/2013',
			endDate : '09/2013',
			company : 'Edelman',
			role : 'Front-end Web Developer',
			description : "Responsible for all front-end and UX for GEReports 1.0, UX for GE Capital & developed sites for Samsung, Paypal, Shell, etc."
		},
		{
			current: false,
			startDate : '01/2013',
			endDate : '07/2013',
			company : 'The Creative Company',
			role : 'Front-end Web Developer',
			description : "At The Creative Company, I initially came on the team as a junior front-end developer- however during my last three months I fulfilled duties as a full-stack developer as well as IT Manager."
		}
	]

	locals.recommendations = [
		{
			name: 'Rob Morris',
			role : 'Managing Director',
			company: 'Prismatik',
			when : 'January 11th, 2015',
			said: "Michael has the rare gift of being able to thrive in ambiguity, and is impressively adaptable, naturally talented and driven to succeed. Bright and always up for a challenge, he is a fast learner who responds well to guidance and works well in teams or alone. He does great work, and I'm thoroughly impressed."
		},
		{
			name: 'Jamal Hamidi',
			role : 'Executive Creative Director',
			company: 'Edelman',
			when : 'May 18th, 2014',
			said: "Incredibly smart, tirelessly dedicated, and always on the hunt for a newer, better, more creative way of solving problems, Michael tackles every assignment with boundless energy and good humour. If you need a fiendishly clever and capable addition to your team, Michael's your guy."
		},
		{
			name: 'Samuel Goodwin',
			role : 'Web Architect',
			company: 'Edelman',
			when : 'June 21st, 2013',
			said: "I hired Michael with no experience, but with a raw talent beyond his years, and it paid off in droves. I cannot recommend Michael highly enough, for his commitment, passion and effort in his work, and excellent knowledge of web development, especially javascript (not just jQuery). I believe, and am confident, that he will go along way in his field of expertise, and will watch his career growth with great interest."
		}
	]


	locals.filters = {
		category: req.params.category
	};

	locals.data = {
		posts: [],
		categories: []
	};

	// Load all categories
	view.on('init', function(next) {

		keystone.list('PostCategory').model.find().sort('name').exec(function(err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function(category, next) {

				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function(err, count) {
					category.postCount = count;
					next(err);
				});

			}, function(err) {
				next(err);
			});

		});

	});

	// Load the current category filter
	view.on('init', function(next) {

		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}

	});

	// Load the posts
	view.on('init', function(next) {
		var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10,
				filters: {
					'state': 'published'
				}
			})
			.sort('-publishedDate')
			.populate('author technologies categories');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});

	});

	// Set locals
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function(next) {

		var newEnquiry = new Enquiry.model(),
			updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, enquiryType, message',
			errorMessage: 'There was a problem submitting your enquiry:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
				console.log('fail')
			} else {
				locals.enquirySubmitted = true;
				console.log('success')
			}

			next();
		});

	});

	// Render the view
	view.render('index');
};
