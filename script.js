
let productosJSON=[];
let totalCarrito;
let contenedor = document.getElementById("misprods");
let botonFinalizar = document.getElementById("finalizar");
let tablaBody = document.getElementById ("tablabody");

//Carrito de compras:

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


//Renderizacion de Productos:

function renderizarProductos(){
    for(const producto of productosJSON){
        contenedor.innerHTML += `
            <div class="card col-md-2">
                <img src=${producto.foto} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.id}</h5>
                    <p class="card-text">${producto.nombre}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <button id="btn${producto.id}" class="btn btn-primary">Comprar</button>
                    
                </div>
            </div>
        `;
    }

    //Evento boton comprar 
    productosJSON.forEach(producto => {        
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    })
}

//Agregar producto al carrito:

function agregarAlCarrito(productoComprado){
    carrito.push(productoComprado);
       
    //sweetalert
    Swal.fire({
        title: productoComprado.nombre,
        text: 'Agregaste este producto al carrito.',
        imageUrl: productoComprado.foto,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: productoComprado.nombre,
        backdrop: `rgba(0,0,123,0.4)`,
        showConfirmButton: false,
        timer: 1500
      })
      actualizarCarrito();
      setItemStorage();
    }

    function calcularTotalCarrito(){
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total a pagar $: "+totalCarrito;
}


botonFinalizar.onclick = () => {
    /*
    if(carrito.length==0){
        Swal.fire({
            title: 'El carro está vacío',
            text: 'compre algun producto',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
    }else{
        */
    carrito.splice(0, carrito.length);
    console.log(carrito);
    document.getElementById("tablabody").innerHTML="";
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total $: ";

    notificarCompraExitosa();

    localStorage.removeItem('carrito');
}

function notificarCompraExitosa(){
    //Toastify
Toastify({
    text: "Pronto recibirás un mail de confirmacion de tu compra",
    duration: 3000,
    gravity: 'bottom',
    position: 'left',
    style: {        
        background: 'linear-gradient(to left, #283747, #D6DBDF)'
    }
}).showToast();

}
  
  //agrego una funcion para actualizar el carrito:

  function actualizarCarrito(){
    console.table(carrito);
        let aux = '';
        carrito.forEach((producto) => {
            aux = aux + 
            `
            <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td><button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary">🗑</button></td>
        </tr>


            `;
        })
        tablaBody.innerHTML = aux;
        
        calcularTotalCarrito();
        }
    
    
  
//Agrego una función que elimine el producto del carrito:

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    carrito.splice(carrito.indexOf(producto), 1);
    actualizarCarrito();
  };

  renderizarProductos();
  actualizarCarrito();


 
