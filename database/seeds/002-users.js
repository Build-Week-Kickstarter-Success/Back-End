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
					password:
						'$2y$12$narBvzGsWAFS/5El9DFcWeLkb5GqOdpXmT9d4hwNTpyYbfiKJSFya',
					avatar: 'http://somepic.com/pic.jpg',
					role: 1,
					first_name: 'admin',
					last_name: 'admin',
					email: 'someone@email.com',
				},
				{
					id: 2,
					username: 'Kstarter1',
					password: 'Kickit112',
					avatar: 'http://somepic.com/pic.jpg',
					role: 2,
					first_name: 'person',
					last_name: 'personson',
					email: 'perpersonson@email.com',
				},
				{
					id: 3,
					username: 'Kstarter2',
					password: 'DontKickIt',
					avatar: 'http://somepic.com/pic.jpg',
					role: 2,
					first_name: 'monkey',
					last_name: 'potato',
					email: 'potato@email.com',
				},
			]);
		});
};
