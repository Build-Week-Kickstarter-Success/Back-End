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
	return db('prediction').select('id', 'prediction').orderBy('id');
}

function findBy(filter) {
	return db('prediction').where(filter).orderBy('id');
}

async function add(prediction) {
	try {
		const [id] = await db('prediction').insert(prediction, 'id');

		return findById(id);
	} catch (error) {
		throw error;
	}
}

function findById(id) {
	return db('prediction').where({ id }).first();
}

function remove(id) {
	return db('prediction').where('id', id).del();
}

function update(id, changes) {
	return db('prediction')
		.where('id', id)
		.update(changes)
		.then((count) => (count > 0 ? get(id) : null));
}

