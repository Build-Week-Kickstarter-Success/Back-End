/** @format */

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('campaign')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('campaign').insert([
				{
					id: 1,
					name: 'Potato Salad',
					video: 'http://somevid.com/movie.mp4',
					description: `I've never made Potato Salad in my life.`,
					disable_communication: false,
					country: 'US',
					currency: 'Dollar',
					goal: 1200,
					length: 60,
				},
				{
					id: 2,
					name: 'Experimental Fruit breeding',
					video: 'http://potatotube.com/randomvid.avi',
					description: `Looking to mix Tomato and avacado. Need research money`,
					disable_communication: true,
					country: 'IE',
					currency: 'EUR',
					goal: 160000,
					length: 190,
				},
				{
					id: 3,
					name: 'New Movie Studio',
					video: 'http://somepic.com/campaign.mvi',
					description: `Looking to make a brand new movie studio!`,
					disable_communication: false,
					country: 'CA',
					currency: 'CAD',
					goal: 270000000,
					length: 365,
				},
			]);
		});
};
