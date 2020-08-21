
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('updates').del()
    .then(function () {
      // Inserts seed entries
      return knex('updates').insert([
        {id: 1, name: 'rowValue1', campaign_id: 1, description: "something"},
        {id: 2, name: 'rowValue2', campaign_id: 2, description: "anything"},
        {id: 3, name: 'rowValue3', campaign_id: 3, description: "seed data"}
      ]);
    });
};
