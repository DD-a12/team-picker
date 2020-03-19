
exports.up = function(knex) {
    return knex.schema.createTable("cohorts",table =>{
        table.increments("id"),
        table.text("members"),
        table.text("imageUrl"),
        table.string("teamName")
        table.timestamp("createdAt").defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("cohorts");
};
