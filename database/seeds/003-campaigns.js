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
					description: `I've never made Potato Salad in my life.`,
					video: 'http://somevid.com/movie.mp4',
					country: 'US',
					currency: 'Dollar',
					goal: 1200,
					length: 60,
					disable_communication: false,
				},
				{
					id: 2,
					name: 'Experimental Fruit breeding',
					description: `Looking to mix Tomato and avacado. Need research money`,
					video: 'http://potatotube.com/randomvid.avi',
					country: 'IE',
					currency: 'EUR',
					goal: 160000,
					length: 190,
					disable_communication: true,
				},
				{
					id: 3,
					name: 'New Movie Studio',
					description: `Looking to make a brand new movie studio!`,
					video: 'http://somepic.com/campaign.mvi',
					country: 'CA',
					currency: 'CAD',
					goal: 270000000,
					length: 365,
					disable_communication: false,
				},
			]);
		});
};
