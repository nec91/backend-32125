const { mysql, sqlite } = require("../database/options");
const mysqlKnex = require('knex')(mysql)
const sqliteKnex = require('knex')(sqlite)

mysqlKnex.schema.dropTableIfExists("productos").finally(() => {
  knex.schema
    .createTable("productos", (tabla) => {
      tabla.increments("id");
      tabla.string("title");
      tabla.float("price");
      tabla.string("thumbnail");
    })
    .then(() => console.log("Tabla creada"))
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });
});

sqliteKnex.schema.dropTableIfExists("mensajes").finally(() => {
  sqliteKnex.schema.createTable("mensajes", (tabla) => {
    tabla.increments("id");
    tabla.string("email");
    tabla.timestamp("date").defaultTo(sqliteKnex.fn.now());
    tabla.string("mensaje");
  })
    .then(() => console.log("Tabla creada"))
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });
});
