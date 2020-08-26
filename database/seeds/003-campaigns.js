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
					desc: `I've never made Potato Salad in my life.`,
					keywords: 'Potato, Salad, Potato Salad',
					disable_communication: false,
					country: 'US',
					currency: 'Dollar',
					goal: 1200,
					campaign_length: 60,
					user_id: 1,
				},
				{
					id: 2,
					name: 'Experimental Fruit breeding',
					video: 'http://potatotube.com/randomvid.avi',
					desc: `Looking to mix Tomato and avacado. Need research money`,
					disable_communication: true,
					keywords: "fruit",
					country: 'IE',
					currency: 'EUR',
					goal: 160000,
					campaign_length: 190,
					user_id: 2,
				},
				{
					id: 3,
					name: 'New Movie Studio',
					video: 'http://somepic.com/campaign.mvi',
					desc: `Looking to make a brand new movie studio!`,
					disable_communication: false,
					keywords: "movie",
					country: 'CA',
					currency: 'CAD',
					goal: 270000000,
					campaign_length: 365,
					user_id: 3,
				},
			]);
		});
};
