const fs = require("fs");

class Contenedor {
  constructor(name) {
    this.rutaArchivo = `${__dirname}/db/${name}.json`;
  }

  async #leerArchivo() {
    try {
      const contenido = await fs.promises.readFile(this.rutaArchivo, "utf-8");
      const contenidoParseado = JSON.parse(contenido);
      return contenidoParseado;
    } catch (error) {
      console.log(error);
    }
  }

  async save(objeto) {
    const contenidoArchivo = await this.#leerArchivo();
    if (contenidoArchivo.length !== 0) {
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify(
          [
            ...contenidoArchivo,
            {
              ...objeto,
              id: contenidoArchivo[contenidoArchivo.length - 1].id + 1,
            },
          ],
          true,
          2
        ),
        "utf-8"
      );
    } else {
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify([{ ...objeto, id: 1 }]),
        "utf-8"
      );
    }
  }
  async getById(id) {
    const contenidoArchivo = await this.#leerArchivo();
    const producto = contenidoArchivo.filter((item) => item.id === id);
    if (producto.length > 0) {
      return producto;
    } else {
      return "Elemento no encontrado.";
    }
  }

  async getAll() {
    try {
      const contenidoArchivo = await this.#leerArchivo();
      return contenidoArchivo;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify([], null, 2),
        "utf-8"
      );
      console.log("Base de datos eliminada correctamente");
    } catch (error) {
      console.log("Error al eliminar base de datos", error);
    }
  }

  async deleteById(id) {
    const contenidoArchivo = await this.#leerArchivo();

    try {
      const notDeleted = contenidoArchivo.filter(
        (elemento) => elemento.id !== id
      );
      const toDelete = contenidoArchivo.filter(
        (elemento) => elemento.id === id
      );
      if (toDelete.length > 0) {
        await fs.promises.writeFile(
          this.rutaArchivo,
          JSON.stringify(notDeleted, null, 2),
          "utf-8"
        );
        console.log(`Elemento eliminado:${JSON.stringify(toDelete, null, 2)}`);
      }
    } catch (error) {
      return "Elemento no encontrado.";
    }
  }

  async modifyById(id, elemento) {
    try {
      const contenidoArchivo = await this.#leerArchivo();
      let producto = await contenidoArchivo.map((e) => {
        if (e.id === id) {
          e = {
            ...elemento,
            id: id,
          };
          return e;
        } else {
          return e;
        }
      });
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify(producto, null, 2),
        "utf-8"
      );

      return "Elemento modificado.";
    } catch (error) {
      return error;
    }
  }

  async saveCarrito(obj, id) {
    try {
        const contenidoArchivo = await this.#leerArchivo();
        let index = contenidoArchivo.indexOf(contenidoArchivo.find(item => item.id === id));
        if (!index) {
          contenidoArchivo[index].productos.push(obj);
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(index, null, 2), 'utf-8');

            return 'Producto aderido';
        } else {
            return 'Carrito no encontrado.'
        }
    } catch (error) {
        return error;
    }
}
}

module.exports = Contenedor;
