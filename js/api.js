document.addEventListener("DOMContentLoaded", traerProductos)

const contenedorShop = document.getElementById("productos")
const contenedorCarrito = document.getElementById("modalCarrito")
const contNumeroCarrito = document.getElementById("numeroCarrito")
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito")
const montoTotal = document.getElementById("montoTotal")
/*--------------------Get Storage-------------------------------*/
let productosEnCarrito = []
//PARA LOCALSTORAGE DOCUMENT LISTENER
document.addEventListener('DOMContentLoaded',()=>{
    productosEnCarrito = JSON.parse(localStorage.getItem("carritoApi")) || [];
    pintarProdEnCarrito()
})

//TRAIGO DE LA API LA URL DE TODOS LOS PRODUCTOS 
function traerProductos() {
    //guardo la url con 20 prod
    const url = "https://fakestoreapi.com/products/"
    //guardo la url con 5 prod
    // const url = "https://fakestoreapi.com/products?limit=5"

    fetch(url)
        //traigo los productos de la api con formato json
        .then(respuesta => respuesta.json())
        // data me muestra la info
        .then(data => {
            //console.log(data)
            pintarProductos(data)
        })
        // me muestra si ocurrio un error y cual fue
        .catch(err => console.log("ERROR DEL CATCH " + err))

}

//PINTO LAS CARD 
const pintarProductos = (productos) =>{
        //console.log(productos)
        productos.forEach((element) => {
            //DESTRUCTURING
            const {id, title, price, category, description, image} = element
            //INYECTO LAS CARD EN EL DOM
            const content = document.createElement("div")
            content.classList.add("tienda", "col","pt-5", "bg-light", "mx-2", "border-2")
            content.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${image}" class="card-img-top img__card" alt="...">
                <div class="card-body">
                <h5 class="card-title">${title}</h5><hr>
                <p class="card-text">Descripcion: ${description}</p>
                <p class="card-subtitle mb-2 ">Categoria: ${category}</p>
                <p class="card-subtitle mb-2 text-muted">Precio: $${price}</p>
                
                <a href="#" id="btnAgregarProducto${id}" class="btn btn-primary">Agregar al carrito</a>
                </div>
            </div>  
                    `
            contenedorShop.appendChild(content)
            const btnAgregarProducto = document.getElementById(`btnAgregarProducto${id}`)
            btnAgregarProducto.addEventListener("click", function() {
                verProducto(id)
            })
    
        });

}


//MOSTRAR PRODUCTO A AGREGAR
function verProducto(id){
    //console.log(id)
    //la url con el id que recibe por parametro
    const url = `https://fakestoreapi.com/products/${id}`

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            //console.log(data)
            agregarProductos(data)

        })
        .catch(err => console.log("ERROR DEL CATCH " + err))
}

//FUNION QUE AGREGA PRODUCTOS AL CARRITO 
const agregarProductos = (productos) =>{

    productosEnCarrito.push(productos)
    pintarProdEnCarrito()
    
}

//FUNCION QUE PINTA LOS PRODUCTOS AL CARRITO
const pintarProdEnCarrito = () => {

    contenedorCarrito.innerHTML = ""

    productosEnCarrito.forEach((element) => {
        
        //DESTRUCTURING
        const {id, title, price, image} = element
        //INYECTO LOS PRODUCTOS EN EL DOM DEL CARRITO
        const itemsCarrito = document.createElement("div")
        itemsCarrito.classList.add("carrito__body", "carritoBody", "d-flex", "justify-content-around")
        itemsCarrito.innerHTML = `
        <img class="body__img img__carrito" src="${image }">
        <div class="body__info d-flex">
            <p class="body__producto pt-lg-5 fs-5 mx-3">${title}</P>
            <p class="body__precio  pt-lg-5 fs-5 mx3">Precio: <span class="fw-semibold">$${price}</span></p>          
            <p class="body__subtototal pt-lg-5 fs-5 mx-3">Sub-total: <span class="fw-semibold text-center" id="cantidad"> $${price}</span></p>
        
        </div>
        <a id="eliminarDelCarrito${id}" class="body__btnElim pt-5"><i class="bi bi-trash3 icono"></i></a> 
        `
        contenedorCarrito.appendChild(itemsCarrito)

        contNumeroCarrito.innerHTML = productosEnCarrito.length

        const eliminarProducto = document.getElementById(`eliminarDelCarrito${id}`)
        eliminarProducto.addEventListener("click", () =>{
            eliminarProdCarrito(id)
        })
    });
    montoTotal.innerText = productosEnCarrito.reduce((acc, prod) => acc + prod.price, 0) 
    guardarStorageApi()
}

//FUNCION QUE ELIMINA PRODUCTOS DE A UNO
const eliminarProdCarrito = (prodId) =>{
    //console.log(`eliminarDelCarrito${prodId}`)
    console.log(productosEnCarrito)
    productosEnCarrito = productosEnCarrito.filter((prod) => prod.id !== prodId)
    if(productosEnCarrito.length === 0){
        contNumeroCarrito.innerText = 0
    }
    pintarProdEnCarrito()
}

//EVENTO QUE ESCUCHA EL BOTON VACIAR CARRITO vacia todo el carrito
btnVaciarCarrito.addEventListener("click", ()=>{
    productosEnCarrito.length = []
    contNumeroCarrito.innerText = 0
    pintarProdEnCarrito()
      
})

//GUARDAR STORAGE
function guardarStorageApi(){
    localStorage.setItem("carritoApi", JSON.stringify(productosEnCarrito))
}
 
