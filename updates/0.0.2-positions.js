var positions = [
  {
    current: true,
    startDate : '05/01/2017',
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
    startDate : '01/01/2016',
    endDate : undefined,
    company : 'ALAUD',
    role : 'Creative Technologist',
    description: "At ALAUD, I act as a creative technology consultant in the video/brand production space. Helped develop key technologies for Calvin Klein's 2016 Fall Collection Launch and Desert Rave events."
  },
  {
    current: true,
    startDate : '04/01/2015',
    endDate : '05/01/2017',
    company : 'Bitstew/GE Digital',
    role : 'Senior UI/UX Developer',
    description: "I was brought on to refresh and architect a brand new user experience for Bitstew's MIX Director (Known now as Predix Studio), an Industrial IoT Visualisation and Management platform. From wireframes, through to finished designs to front end architecture, I helped lead each stage towards the eventual acquisition and integration into GE Digital's Predix software suite."
  },
  {
    current: false,
    startDate : '01/11/2014',
    endDate : '02/01/2015',
    company : 'Snow',
    role : 'Digital Creative Director',
    description: "Founded and ran a 'Creative Technology As a Service' (CTAAS) Agency. Creative Direction, Technical Leadership, Design and Development of all work being output. This was a /terrible/ idea, but there's nothing like trial by fire."
  },
  {
    current: false,
    startDate : '09/01/2014',
    endDate : '01/01/2015',
    company : 'REBORN, LOWE PROFERO, ZIPMENTS & BP PARTNERS',
    role : 'Misc. Contract Roles',
    description : "Front-end development and design for various projects"
  },
  {
    current: false,
    startDate : '04/01/2014',
    endDate : '01/01/2015',
    company : 'PRISMATIK',
    role : 'Head of Creative',
    description : "Creative Direction, Marketing strategy, Rapid Prototyping, Innovation research, Copywriting, UX and Branding"
  },
  {
    current: false,
    startDate : '09/01/2013',
    endDate : '04/01/2014',
    company : 'Edelman',
    role : 'Creative',
    description : "Copywriter, Video editor, animator, UX consult, concept artist, traditional artist, concept developer and pretty much everything else you can think of."
  },
  {
    current: false,
    startDate : '07/01/2013',
    endDate : '09/01/2013',
    company : 'Edelman',
    role : 'Front-end Web Developer',
    description : "Responsible for all front-end and UX for GEReports 1.0, UX for GE Capital & developed sites for Samsung, Paypal, Shell, etc."
  },
  {
    current: false,
    startDate : '01/01/2013',
    endDate : '07/01/2013',
    company : 'The Creative Company',
    role : 'Front-end Web Developer',
    description : "At The Creative Company, I initially came on the team as a junior front-end developer- however during my last three months I fulfilled duties as a full-stack developer as well as IT Manager."
  }
];

var keystone = require('keystone'),
	async = require('async'),
	Position = keystone.list('Position');

function createPosition(position, done) {
	var newPosition = new Position.model(position);

	newPosition.save(function(err) {
		if (err) {
			console.error("Error adding position to the database:");
			console.error(err);
		} else {
			console.log("Added position to the database.");
		}
		done(err);
	});

}

exports = module.exports = function(done) {
	async.forEach(positions, createPosition, done);
};
