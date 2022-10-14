class Carritos {
  constructor(productos) {
    this.timestamp = new Date().toLocaleString();
    this.productos = productos || [];
  }
}

module.exports = Carritos;
