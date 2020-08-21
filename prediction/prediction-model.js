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
	return db('prediction');
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

function update(changes, id) {
    return db("prediction")
    .where({id})
    .update(changes)
    .then(count => {
        return findById(id);
    })
    }

