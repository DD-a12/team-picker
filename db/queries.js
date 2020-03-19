const knex = require("./client");

module.exports = {
    getAll() {
        return knex("cohorts").select("*").orderBy( "createdAt", "desc" );
    }, 
    getOne(id) {
        return knex("cohorts")
        .where("id", id)
        .first();
    },
    create(cohorts) {
        return knex("cohorts").insert(cohorts, "*");
    }, 
    update(id,cohorts) {
        return knex("cohorts")
        .where("id",id)
        .update(cohorts,"*");
    },
    delete(id) {
        return knex("cohorts")
        .where("id", id)
        .del();
    }
};