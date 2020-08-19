/** @format */

const db = require('../database/dbConfig.js');

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove,
	update,
};

function find() {
	return db('campaign').select('id', 'campaign').orderBy('id');
}

function findBy(filter) {
	return db('campaign').where(filter).orderBy('id');
}

async function add(campaign) {
	try {
		const [id] = await db('campaign').insert(user, 'id');

		return findById(id);
	} catch (error) {
		throw error;
	}
}

function findById(id) {
	return db('campaign').where({ id }).first();
}

function remove(id) {
	return db('campaign').where('id', id).del();
}

function update(id, changes) {
	return db('campaign')
		.where('id', id)
		.update(changes)
		.then((count) => (count > 0 ? get(id) : null));
}
