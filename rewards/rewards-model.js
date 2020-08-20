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
	return db('rewards').select('id', 'rewards').orderBy('id');
}

function findBy(filter) {
	return db('rewards').where(filter).orderBy('id');
}

async function add(rewards) {
	try {
		const [id] = await db('rewards').insert(rewards, 'id');

		return findById(id);
	} catch (error) {
		throw error;
	}
}

function findById(id) {
	return db('rewards').where({ id }).first();
}

function remove(id) {
	return db('rewards').where('id', id).del();
}

function update(id, changes) {
	return db('rewards')
		.where('id', id)
		.update(changes)
		.then((count) => (count > 0 ? get(id) : null));
}

