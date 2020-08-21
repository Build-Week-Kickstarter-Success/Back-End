/** @format */

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('rewards')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('rewards').insert([
				{
					id: 1,
					name: 'Shoutout',
					campaign_id: 1,
					milestone: 10,
					description: "With $10, you get a shoutout in an update video!"
				},
				{
					id: 2,
					name: 'Potato with Name on it',
					campaign_id: 1,
					milestone: 10,
					description: "With $25, you get a shoutout in an update video!"
				},
				{
					id: 3,
					name: 'Shoutout',
					campaign_id: 1,
					milestone: 10,
					description: "With $10, you get a shoutout in an update video!"
        },
        {
					id: 4,
					name: 'Shoutout',
					campaign_id: 2,
					milestone: 10,
					description: "With $10, you get a shoutout in an update video!"
        },
        {
					id: 5,
					name: 'Shoutout',
					campaign_id: 3,
					milestone: 10,
					description: "With $10, you get a shoutout in an update video!"
        },
        {
					id: 6,
					name: 'Shoutout',
					campaign_id: 3,
					milestone: 10,
					description: "With $10, you get a shoutout in an update video!"
        },
        {
					id: 7,
					name: 'Shoutout',
					campaign_id: 3,
					milestone: 10,
					description: "With $10, you get a shoutout in an update video!"
        },
			]);
		});
};
