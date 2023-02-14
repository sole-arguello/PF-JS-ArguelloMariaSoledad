//CONTENEDORES PADRES
const contenedorShop = document.getElementById("cardProductos")
const contadorCarrito = document.getElementById("contadorCarrito")
const contenedorCarrito = document.getElementById("carritoContenedor")
const totalSumaProductos = document.getElementById("precioTotal")
const contTituloCategoria = document.getElementById("tituloCategoria")

//CONTENEDOR BOTON VACIAR CARRITO
const vaciarCarrito = document.getElementById("vaciarCarrito")

//CONTENEDOR CARTEL NO HAY PRODUCTOS 
const carritoContenedor = document.getElementById("carritoContenedor")

//CONTENEDOR BOTONES FILTRADO
const btnTodos = document.getElementById("todos")
const btnConjunto = document.getElementById("conjuntos")
const btnTop = document.getElementById("top")
const btnBombis = document.getElementById("bombis")


/*--------------------Get Storage-------------------------------*/
let carrito = []
//PARA LOCALSTORAGE DOCUMENT LISTENER
document.addEventListener('DOMContentLoaded',()=>{
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    pintarProductosEnCarrito()
})
//console.log(carrito)


//FUNION QUE AGREGA PRODUCTOS AL CARRITO -> en pintarCard
const agregarProductos = (prodId) => {
    //para no repetir el producto
    const existe = carrito.some(prod => prod.id === prodId)
    console.log(existe)
    if(existe){
        const prod = carrito.map(prod => {
       // console.log(prod)
            // if(prod.id === prodId){
            //     prod.cantidad++
            // }

            //OPERAADOR TERNARIO
            prod.id === prodId ? prod.cantidad++ : false
        })
    }else{
        //busco que coincida el id y cargo el producto al carrito
        const item = productos.find((prod) => prod.id === prodId)
        carrito.push(item)
        console.log(carrito)       
    }
    pintarProductosEnCarrito()
}
//FUNCION DE ELIMINAR PRODUCTO DE A UNO DENTRO DEL CARRITO 
function eliminarDelCarrito(id){
    const prodId = id
    carrito = carrito.filter((prod) => prod.id !== prodId)
    // llamo a la funcion que muestra el carrito
    pintarProductosEnCarrito()
}
//EVENTO QUE ESCUCHA EL BOTON VACIAR CARRITO vacia todo el carrito
vaciarCarrito.addEventListener("click", ()=>{
    carrito.length = []
    pintarProductosEnCarrito()
})


//FUNCION QUE FILTRA LAS CATEGORIAS -> en botones todos-conjunto-top-bombis
const filtrarCategorias = (categoria) => {
 
    const filtrarCateg = productos.filter(prod => prod.categoria === categoria)
    //console.log(filtrarCateg)
    pintarCard(filtrarCateg)
}
//EVENTOS QUE ESCUCHA LOS BOTONES DE LAS CATEGORIAS -> en pintarCard
btnTodos.onclick = () => pintarCard() 
btnConjunto.onclick = () => { contTituloCategoria.innerText= "Conjuntos"; filtrarCategorias("Conjunto") }
btnTop.onclick = () => { contTituloCategoria.innerText= "Top"; filtrarCategorias("Top")}
btnBombis.onclick = () =>{ contTituloCategoria.innerText= "Bombis"; filtrarCategorias("Bombis")}


//FUNCION QUE PINTA LAS CARD EN EL DOM
const pintarCard = (categoria) => {
    //actualizo al html para pintar segun la categoria que elija
    contenedorShop.innerHTML = "";
   
    //creo una variable auxiliar y pregunto si existe la categoria
    let prodAMostrar;
    //OPERADOR TERNARIO
    categoria ? prodAMostrar = categoria : prodAMostrar = productos;

    // if(categoria){
    //     //guardo una copia del array original
    //     prodAMostrar = categoria
    // }else{
    //     //sino existe la categoria que muestre el array original
    //     prodAMostrar = productos
    // }
    
    // recorro la copia 
    prodAMostrar.forEach((producto) =>{
       
        const content = document.createElement("div")
        content.classList.add("productos__contenedorGral--contCard", "col")
        content.innerHTML = `
        <div class="productos__contenedorGral--contCard-card card ">
            <img class="img__card card-img-top" src=${producto.img} alt="producto lenceria">
            <div class="contenedor__body card-body">
                <div class="contenedor__body--info ">
                    <h2 class="contenedor__body--info--titulo card-title fs-4">${producto.titulo}</h2> 
                    <p class="contenedor__body--info--precio card-text fs-5 fw-semibold">$ ${producto.precio}</p>                   
                </div>
                <hr><p class="contenedor__body--info--precio card-text fs-6">Los talles disponibles
                son<span class="fw-semibold mx-2">S - M - L - XL</span>y los podes elejir en
                <span class="fw-semibold">Blanco - Negro - Gris - Beige - Rojo - Fuxia - Estampados</span></p> 
                <button id=${producto.id} class="contenedor__body--btn btn btn-secondary text-dark" id="agregarCarrito">Agregar al carrito</button>
            </div>
        </div>     
        `
        contenedorShop.appendChild(content)
        //EVENTO QUE ESCUCHA AL BOTON AGRAGAR PRODUCTOS
        const boton = document.getElementById(`${producto.id}`)
        // console.log(boton)
        boton.addEventListener("click", function(){
            agregarProductos(producto.id)
        })
    })   

}

//FUNCION QUE PINTA LOS PRODUCTOS DENTRO DEL CARRITO
const pintarProductosEnCarrito = () =>{
    //cada vez que llamo a la funcion borro el nodo y lo inicio vacio
    contenedorCarrito.innerHTML = ""
    //para el incremento del numero en el carrito
    let totalOfProducts= 0
    //recorre el array y lo llena con info actualizada
    carrito.forEach((producto) => {
        const contItemsCarrito = document.createElement("div")
        contItemsCarrito.classList.add("carrito__body", "carritoBody")
        contItemsCarrito.innerHTML = `
            <img class="body__img" src="${ producto.img }">
            <div class="body__info">
                <p class="body__producto pt-lg-5 fs-5">${producto.titulo}</P>
                <p class="body__precio  pt-lg-5 fs-5">Precio: <span class="fw-semibold">$${producto.precio}</span></p>          
        

                <div class="body__cant  pt-lg-5 d-flex">
                    <span id="restar${producto.id}" class="restar pt-2" ><i class="bi bi-dash-square"></i></span>
                    <span  class="num px-2 fs-3 pb-5" id="cantidad">${producto.cantidad}</span> 
                    <span id ="sumar${producto.id}" class="signos pt-2" ><i class="bi bi-plus-square"></i></span>
                </div>
                <p class="body__subtototal pt-lg-5 fs-5">Sub-total: <span class="fw-semibold text-center" id="cantidad"> $${producto.cantidad * producto.precio}</span></p>
            
            </div>
            <a id="eliminarDelCarrito${producto.id}" class="body__btnElim"><i class="bi bi-trash3 icono"></i></a> 
    

        `
        contenedorCarrito.appendChild(contItemsCarrito)
        //por cada click aumenta el numero del carrito
        totalOfProducts = totalOfProducts + producto.cantidad
        //console.log(totalOfProducts)

        //EVENTO QUE ESCUCHA EL BOTON RESTAR, SUMAR Y VACIAR DENTRO DEL CARRITO
        const restar = document.getElementById(`restar${producto.id}`)
        restar.addEventListener("click" , ()=>{
            // if(producto.cantidad !== 1){
            //     producto.cantidad--;
            //     pintarProductosEnCarrito()
            // }
            //OPERADOR TERNARIO
            let cantidad = producto.cantidad !== 1 ? producto.cantidad-- : false
            cantidad ? pintarProductosEnCarrito() : false
        })
        const sumar = document.getElementById(`sumar${producto.id}`)
        sumar.addEventListener("click" , ()=>{
            producto.cantidad++;
            pintarProductosEnCarrito()
        })

        const eliminar = document.getElementById(`eliminarDelCarrito${producto.id}`)
        eliminar.addEventListener("click", () =>{
           eliminarDelCarrito(producto.id)
           pintarProductosEnCarrito()
        })
    })
    //por cada producto, el acumulador le sume precio al prod 
    totalSumaProductos.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
    
    // mostrar cartel cuando no hay nada en el carrito
    // if(carrito.length === 0){
    //     carritoContenedor.innerHTML = `
    //     <p class="text-center text-primary "> !No Hay Productos! </p>`
    // }else{
    //     console.log("algo")
    // }

    //OPERAADOR TERNARIO -  mostrar cartel cuando no hay nada en el carrito
    carrito.length === 0 ? carritoContenedor.innerHTML = `<p class="text-center text-primary "> !No Hay Productos! </p>` : false
    //IGUALA CANTIDADES DEL CARRITO DEL HEADER A LO QUE TENGA EL CARRITO
    contadorCarrito.innerText= totalOfProducts
    guardarStorage()
}

//LLAMADO DE FUNCIONES
pintarCard()


//GUARDAR STORAGE
function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}
