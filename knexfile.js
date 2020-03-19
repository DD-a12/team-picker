
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: "team_picker",
      username: "codecore",
      password: "codecore"
    },
    migrations: {
      tablename: "migrate",
      directory: "./db/migrations"
    }
  },
};
