/** @format */

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('users').insert([
				{
					id: 1,
					username: 'Admin',
					password: 'waffles',
					avatar: 'http://somepic.com/pic.jpg',
					role: 1,
				},
				{
					id: 2,
					username: 'Kstarter1',
					password: 'Kickit112',
					avatar: 'http://somepic.com/pic.jpg',
					role: 2,
				},
				{
					id: 3,
					username: 'Kstarter2',
					password: 'DontKickIt',
					avatar: 'http://somepic.com/pic.jpg',
					role: 2,
				},
			]);
		});
};
