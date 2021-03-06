const db = require("../database/dbConfig.js");


module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db("users").select("id", "username").orderBy("id");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}

function remove(id) {
  return db('users').where('id', id).del();
}

function update(changes, id) {
  return db("users")
  .where({id})
  .update(changes)
  .then(count => {
      return findById(id);
  })
  }