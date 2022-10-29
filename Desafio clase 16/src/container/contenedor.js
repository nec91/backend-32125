const knex = require("knex");

class Contenedor {
  constructor(mariaDB, tabla) {
    this.knex = knex(mariaDB),
      this.tabla = tabla
  }

  async save(elemento) {
    try {
      const save = await this.knex(this.tabla).insert(elemento)
      return save
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id) {
    try {
      const getById = await this.knex.from(this.tabla).where('id', id).select('*')
      return getById
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      const getAll = await this.knex(`${this.tabla}`).select('*')
      return getAll
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAll() {
    try {
      const deleteAll = await this.knex.from(this.tabla).select('*')
      return deleteAll
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      const deleteById = await this.knex.from(this.tabla).where('id', id).del()
      return deleteById
    } catch (error) {
      console.error(error);
    }
  }

  async modifyById(elemento, id) {
    try {
      const modifyById = await this.knex.update(elemento).where('id', id)
      return modifyById
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Contenedor
