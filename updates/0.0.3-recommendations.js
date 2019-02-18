var recommendations = [
  {
    name: 'Aron Graham',
    role : 'Director User Experience Design',
    company: 'GE Digital',
    when : '04/28/17',
    said: "What has always impressed me with Michael is his ability to rapidly absorb vast amounts of knowledge and apply it with creativity and artistry to high quality products designs. Michaels ability to develop truly visionary designs that still manage to fit within the constraints of customer demands makes him a rare entity indeed and a truly Creative Technologist in every sense. I very rarely write recommendations for people as they often sound somewhat insincere or contrived but I am posting one for Michael because he is one of those rare individuals that will absolutely, without a doubt, help any team creating exciting bleeding edge tech absolutely dominate their market. if you are lucky enough to have Michael apply for a position in your team do not waste any more time with other candidates. hire this man on the spot"
  },
  {
    name: 'Rob Morris',
    role : 'Managing Director',
    company: 'Prismatik',
    when : '01/11/15',
    said: "Michael has the rare gift of being able to thrive in ambiguity, and is impressively adaptable, naturally talented and driven to succeed. Bright and always up for a challenge, he is a fast learner who responds well to guidance and works well in teams or alone. He does great work, and I'm thoroughly impressed."
  },
  {
    name: 'Jamal Hamidi',
    role : 'Executive Creative Director',
    company: 'Edelman',
    when : '05/18/14',
    said: "Incredibly smart, tirelessly dedicated, and always on the hunt for a newer, better, more creative way of solving problems, Michael tackles every assignment with boundless energy and good humour. If you need a fiendishly clever and capable addition to your team, Michael's your guy."
  },
  {
    name: 'Samuel Goodwin',
    role : 'Web Architect',
    company: 'Edelman',
    when : '06/21/13',
    said: "I hired Michael with no experience, but with a raw talent beyond his years, and it paid off in droves. I cannot recommend Michael highly enough, for his commitment, passion and effort in his work, and excellent knowledge of web development, especially javascript (not just jQuery). I believe, and am confident, that he will go along way in his field of expertise, and will watch his career growth with great interest."
  }
]

var keystone = require('keystone'),
	async = require('async'),
	Recommendation = keystone.list('Recommendation');

function createRecommendation(recommendation, done) {
	var newRecommendation = new Recommendation.model(recommendation);

  newRecommendation.name.first = recommendation.name.split(' ')[0];
  newRecommendation.name.last = recommendation.name.split(' ')[1];
	newRecommendation.save(function(err) {
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
	async.forEach(recommendations, createRecommendation, done);
};
