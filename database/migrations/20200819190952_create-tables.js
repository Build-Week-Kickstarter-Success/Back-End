/** @format */

exports.up = function (knex) {
	return knex.schema
		.createTable('roles', (tbl) => {
			tbl.increments();
			tbl.string('name', 128).notNullable().unique();
		})
		.createTable('users', (tbl) => {
			tbl.increments();
			tbl.string('username', 128).notNullable().unique().index();
			tbl.string('password', 256).notNullable();
			tbl.string('avatar');
			tbl.string('first_name', 128).notNullable();
			tbl.string('last_name', 128).notNullable();
			tbl.string('email').notNullable();
			tbl.integer('role').unsigned().references('roles.id').onDelete('RESTRICT').onUpdate('CASCADE').defaultTo(2);
		})
		.createTable('campaign', (tbl) => {
			tbl.increments();
			tbl.string('name', 128).notNullable().unique();
			tbl.string('video', 128);
			tbl.string('desc').notNullable().unique();
			tbl.boolean('disable_communication').notNullable().defaultTo(false);
			tbl.string('keywords');
			tbl.string('country').notNullable();
			tbl.string('currency').notNullable();
			tbl.float('goal').notNullable();
			tbl.float('campaign_length').notNullable();
			tbl.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
		})
		.createTable('rewards', (tbl) => {
			tbl.increments();
			tbl.string('name', 128).notNullable();
			tbl.integer('campaign_id').unsigned().notNullable().references('campaign.id').onDelete('CASCADE').onUpdate('CASCADE');
			tbl.float('milestone').notNullable();
			tbl.string('description').notNullable();
		})
		.createTable('updates', (tbl) => {
			tbl.increments();
			tbl.string('name', 128).notNullable();
			tbl.integer('campaign_id').unsigned().notNullable().references('campaign.id').onDelete('CASCADE').onUpdate('CASCADE');
			tbl.string('description').notNullable();
		})
		.createTable('prediction', (tbl) => {
			tbl.increments();
			tbl.integer('campaign_id').unsigned().notNullable().references('campaign.id').onDelete('CASCADE').onUpdate('CASCADE');
			tbl.boolean('success').defaultTo(false);
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('roles').dropTableIfExists('users').dropTableIfExists('campaign').dropTableIfExists('rewards').dropTableIfExists('updates').dropTableIfExists('prediction');
};
