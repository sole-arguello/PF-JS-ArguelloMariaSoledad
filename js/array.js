class Producto{

    constructor(id, precio, titulo, categoria, cantidad, img ){
        this.id = id;
        this.precio = precio;
        this.titulo = titulo;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.img = img;
    }
}



let productos = [
    new Producto ( 1, 1200, "Conjunto Encaje", "Conjunto", 1, "./img/conjunto1.jpg" ),
    new Producto ( 2, 1500, "Conjunto Algodon", "Conjunto", 1, "./img/conjunto2.jpg" ),
    new Producto ( 3, 2000, "Conjunto Combinado", "Conjunto", 1, "./img/conjunto3.jpg"),
    new Producto ( 4, 1400, "Top Encaje", "Top", 1, "./img/top1.jpg"),
    new Producto ( 5, 1600, "Top Combinado", "Top", 1, "./img/top2.jpg"),
    new Producto ( 6, 900, "Bombis Maria", "Bombis",  1, "./img/bombis1.jpg"),
    new Producto ( 7, 800, "Bombis Victoria", "Bombis", 1, "./img/bombis2.jpg"),
    new Producto ( 8, 500, "Bombis Culote", "Bombis", 1,"./img/bombis3.jpg"),
    new Producto ( 9, 450, "Bombis Less regulables", "Bombis", 1,"./img/bombis4.jpg"),
]


