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
	return db('updates');
}

function findBy(filter) {
	return db('updates').where(filter).orderBy('id');
}

async function add(updates) {
	try {
		const [id] = await db('updates').insert(updates, 'id');

		return findById(id);
	} catch (error) {
		throw error;
	}
}

function findById(id) {
	return db('updates').where({ id }).first();
}

function remove(id) {
	return db('updates').where('id', id).del();
}

function update(changes, id) {
    return db("updates")
    .where({id})
    .update(changes)
    .then(count => {
        return findById(id);
    })
}
