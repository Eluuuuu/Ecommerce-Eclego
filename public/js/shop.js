
function agregarAlCarrito(btn) {

  var id = btn.getAttribute('data-id');
  var urlImagen = btn.getAttribute('data-urlImagen');
  var descripcion = btn.getAttribute('data-descripcion');
  var precio = btn.getAttribute('data-precio');
  var cantidad = btn.getAttribute('data-cantidad')
  var carrito = JSON.parse(localStorage.getItem('carrito'))

  var productoEncontrado = carrito.findIndex(item => item.id == id)


  if (productoEncontrado >= 0) {
    //  productoEncontrado.cantidad = parseInt(productoEncontrado.cantidad) + 1
    carrito[productoEncontrado].cantidad = parseInt(carrito[productoEncontrado].cantidad) + 1

  } else {

    var producto = {
      id: id,
      urlImagen: urlImagen,
      descripcion: descripcion,
      precio: precio,
      cantidad: cantidad
    };

    carrito.push(producto);
  }



  let miArrayJSON = JSON.stringify(carrito) // Agregar el producto al carrito
  localStorage.setItem("carrito", miArrayJSON)

  carritoActualizado()

}


const carritoActualizado = async () => {



  try {

    const productos = JSON.parse(localStorage.getItem('carrito'))//lo paso a objeto
    const url = "http://localhost:3060/carrito/actualizacion-carrito";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ productos }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.text();


    document.getElementById('contenidoCarrito').innerHTML = data


  } catch (error) {
    console.log(error)
    console.log("Hubo un error");
  }




}

const formularioPago = async () => {

  try {
    let metodoPagoSeleccionado= document.querySelector('.opcionElegida').value

    if (metodoPagoSeleccionado == 'efectivo' || ( metodoPagoSeleccionado == 'tarjeta' && campos_obligatorios('form_pago'))) {

      let email = document.getElementById('email').value
      let telefono = document.getElementById('telefono').value
      let nombre_completo = document.getElementById('name').value
      let dni = document.getElementById('dni').value
      let direccion = document.getElementById('direccion').value
      let departamento = document.getElementById('departamento').value
      let numeroCard = document.getElementById('numeroCard').value
      let nameTarjeta = document.getElementById('name').value
      let codigoSeguridad = document.getElementById('codigo').value
      let items = localStorage.getItem('carrito')

      let datos = { email, telefono, nombre_completo, dni, direccion, departamento, numeroCard, nameTarjeta, codigoSeguridad, metodoPagoSeleccionado, items }


      const url = "http://localhost:3060/pago";

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      enviar_email()
      cerrarCarrito(); 
      limpiarCarrito();

    }

  } catch (error) {
    console.log(error)
    console.log("Hubo un error");
  }

}


const enviar_email = async () => {

  let email = document.getElementById('email').value

  try {
    const url = `http://localhost:3060/enviar_email?email=${email}`;

    const response = await fetch(url);
    const data = await response.text();
    console.log(data)

  } catch (error) {
    console.log(error)
    console.log("Hubo un error");
  }

}




function checkMethod(element) {
  let metodoPago = document.querySelector('.opcionElegida')//busca la clase
  if (element.value == 'efectivo') {
    let datosTarjeta = document.getElementById('datosTarjeta');
    datosTarjeta.classList.add('d-none')

  } else {
    let datosTarjeta = document.getElementById('datosTarjeta');
    datosTarjeta.classList.remove('d-none')
  }
  if (metodoPago) {

    element.classList.remove('opcionElegida')
  }
  element.classList.add('opcionElegida')

}


function limpiarCarrito() {

  localStorage.setItem('carrito', '[]')
  globitoActualizado()

}


const continuar_metodo_pago = (element) => {
  if (campos_obligatorios('form_datos_contacto')) {

    let carousel = document.getElementById('carousel')

    const item_activo = carousel.querySelector(".carousel-item.active");
    item_activo.classList.remove('active')
    const next_item = item_activo.nextElementSibling;
    next_item.classList.add('active')

  }


}


const abrir_menu=()=>{


  const elementoOculto = document.getElementById("menu");
  

  elementoOculto.classList.toggle("d-none");
  console.log(elementoOculto)
    
  

}




