/** @format */

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('prediction')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('prediction').insert([
				{ id: 1, campaign_id: 1, success: false },
				{ id: 2, campaign_id: 1, success: false },
				{ id: 3, campaign_id: 1, success: false },
			]);
		});
};
