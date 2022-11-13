

// get item (para obtener)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let precioTotal = localStorage.getItem('precioTotal');
precioTotal = parseInt(precioTotal);
let totalCarrito;
let botonFinalizar = document.getElementById("finalizar");
// set item (para setear)
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

// Renderizacion de Productos 
function renderizarProductos() {
  fetch('/productos.json')
    .then((respuesta) => respuesta.json())
    .then((productos) => {
      let html = "";
      for (let i = 0; i < productos.length; i++) {
        html = html +
          `

                          <div class="card col-md-2">
                            <img src=${productos[i].foto} class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${productos[i].id}</h5>
                            <p class="card-text">${productos[i].nombre}</p>
                            <p class="card-text">$ ${productos[i].precio}</p>     
                            <button onclick="addToCart(${productos[i].id});" type="button" class="btn btn-warning btn-lg">Comprar</button>
     
                            </div>
                          </div>
           `;
      }
      document.getElementById('misprods').innerHTML = html;
    })
    .catch((e) => {
      console.log(e);
    });
}

//Renderizacion de carrito
function renderizacionCarrito() {
  let html = "";
  for (let i = 0; i < carrito.length; i++) {
    html = html +
      `
<tr>
      <th scope="row">${carrito[i].id}</th>
      <td>${carrito[i].nombre}</td>
      <td>$${carrito[i].precio}</td>
      
      <td><i class="fa-solid fa-cart-shopping" onclick="removerCarrito(${i}); saveLocal();" >🗑</i></td>
    </tr>
  `;
  }
  document.getElementById('tablabody').innerHTML = html;
}


//agregar al carrito
function addToCart(id) {
  fetch('/productos.json')
    .then((respuesta) => respuesta.json())
    .then((productos) => {
      const agregarAlCarrito = productos.find((item) => item.id == id);
      carrito.push(agregarAlCarrito);

      //sweetalert

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Su producto se ha agregado correctamente al carrito',
        showConfirmButton: false,
        timer: 1500
      })

      renderizacionCarrito();
      saveLocal();
      calcularPrecioTotal();

    })
    .catch((e) => {
      console.log(e);
    });
}

//Remover productos del carrito
function removerCarrito(id) {
  carrito.splice(id, 1);
  renderizacionCarrito();
  saveLocal();
  calcularPrecioTotal();
}


function calcularPrecioTotal() {
  precioTotal = carrito.reduce((acumulador, productos) => {
    return (acumulador += productos.precio);
  }, 0);
  document.getElementById('total').innerHTML = 'total: $' + precioTotal;
  saveLocal();
  console.log(precioTotal);
}




//evento del boton finalizar compra

botonFinalizar.onclick = () => {

  if (carrito.length == 0) {
    Swal.fire({
      title: 'El carrito está vacío',
      text: 'Seleccione algun producto',
      icon: 'error',
      showConfirmButton: false,
      timer: 1500
    })
  } else {

    carrito.splice(0, carrito.length);
    console.log(carrito);
    document.getElementById("tablabody").innerHTML = "";
    let infoTotal = document.getElementById("total");
    infoTotal.innerText = "Total $: ";

    notificarCompraExitosa();

    localStorage.removeItem('carrito');
  }
}


//Funcion para confirmacion de compra

function notificarCompraExitosa() {
  //Toastify
  Toastify({
    text: "Pronto recibirás un mail de confirmacion de tu compra",
    duration: 3000,
    gravity: 'bottom',
    position: 'left',
    style: {
      background: 'linear-gradient(to left, #c9a974, #90682f)'
    }
  }).showToast();

}


renderizarProductos();
renderizacionCarrito();
calcularPrecioTotal();