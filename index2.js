class usuario {
    constructor(name,apellido,libro,mascotas){
    this.name = name;
    this.apellido = apellido;
    this.libros = libro;
    this.mascotas = mascotas;
    };

    getFullName(){
        console.log( `${this.name} ${this.apellido}`);
    };  
     
    addMascota (tipoMascota){
        this.mascotas.push(tipoMascota);
    };

    countMascota (){
        console.log(`Cantidad de mascotas: ${this.mascotas.length}`);
    };

    addBook (titulo,autor){
        this.libros.push({titulo: titulo, autor: autor});
    };

    getBooksNames (){
        console.log(this.libros.map((libro) => libro.titulo));
    };

};

const user1 = new usuario(
    'Nicolas',
    'Cicchini',
    [{titulo: "libro1",autor:"autor1"},{titulo:"libro2",autor: "autor2"},{titulo:"libro3",autor:"autor3"}],
    ["pato","loro"]
);

//sumo una mascota al array de las ya predefinidas en el constructor
user1.addMascota("rino");

//sumo un objeto al array de libros ya predifinido en el constructor
user1.addBook("libro4","autor4");

user1.getFullName();
user1.getBooksNames();
user1.countMascota();

