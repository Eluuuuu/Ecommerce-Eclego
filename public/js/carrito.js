

window.addEventListener('load', function () {
    // Aquí colocas el código de la función que quieres ejecutar
    document.getElementById('icono_carrito').addEventListener('click', function () {
      document.getElementById('carrito').classList.toggle('oculto')
    }
  
    )
    
    globitoActualizado()
    
    
  });
  
  
  const globitoActualizado=()=>{
  
    let carrito=JSON.parse(localStorage.getItem('carrito'))
  
    let totalCantidades = carrito.reduce((acumulador, producto) => {
      return acumulador + parseInt(producto.cantidad);
    }, 0);
  
  
  
    document.getElementById('cantidadCarrito').innerHTML=totalCantidades
  
  
  }
  
  
  const cerrarCarrito = () => {
    document.getElementById('carrito').classList.toggle('oculto')
  }
  
  
  
  
  
  
  const incrementar = (divPadre) => {
    let contador = parseInt(divPadre.querySelector('.contador').getAttribute('data-contador'))
    let precio = parseFloat(divPadre.querySelector('.contador').getAttribute('data-precio'))
    let id = divPadre.getAttribute('data-id')
    contador++
    divPadre.querySelector('.contador').setAttribute('data-contador', contador)
    let carrito = JSON.parse(localStorage.getItem('carrito'))//lo convierto a array
  
  
    var productoEncontrado = carrito.findIndex(item => item.id == id)
  
    if (productoEncontrado >= 0) {
      carrito[productoEncontrado].cantidad = parseInt(carrito[productoEncontrado].cantidad) + 1
    }
  
    precioOriginal = precio
    precio *= contador
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
  
    globitoActualizado()
  
    actualizarContador(contador, precio, divPadre, precioOriginal, 'suma', carrito)
  
  
  }
  
  
  const decrementar = (divPadre) => {
  
    let contador = parseInt(divPadre.querySelector('.contador').getAttribute('data-contador'))
    let precio = parseFloat(divPadre.querySelector('.contador').getAttribute('data-precio'))
    let id = divPadre.getAttribute('data-id')
    contador--
    divPadre.querySelector('.contador').setAttribute('data-contador', contador)
    let carrito = JSON.parse(localStorage.getItem('carrito'))
  
  
    var productoEncontrado = carrito.findIndex(item => item.id == id)
    console.log(productoEncontrado)
  
    if (productoEncontrado >= 0) {
      if (contador > 0) {
        carrito[productoEncontrado].cantidad = parseInt(carrito[productoEncontrado].cantidad) - 1
      } else {
  
        carrito.splice(productoEncontrado, 1);
  
      }
  
    }
  
    
    
    
    precioOriginal = precio
    precio *= contador
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
  
    globitoActualizado()
  
    actualizarContador(contador, precio, divPadre, precioOriginal, 'resta', carrito)
  
  
  
  }
  
  
  
  
  
  const actualizarContador = (contador, precio, divPadre, precioOriginal, operador, carrito) => {
  
   
  
    if (contador < 1) {
      divPadre.remove()
    } else {
      divPadre.querySelector('.contador').innerHTML = contador
      // divPadre.querySelector('.amount').innerHTML = `$ ${precio}`
    }
  
  
    let total = parseFloat(document.getElementById('totalCarrito').getAttribute('data-total'))
  
    let items = parseInt(document.getElementById('total-items').getAttribute('data-items'))
  
   let cantidad_items=parseInt(divPadre.querySelector('.contador').getAttribute('data-contador'))



    if (operador == 'borrar') {
      total-=precio
      items-=cantidad_items
    } else if (operador === 'suma') {
      total += precioOriginal
      items += 1
    } else {
      total -= precioOriginal
      items -= 1
    }
  
    let cantidad = ''
  
    if (items <= 1) {
      cantidad = 'item'
    } else {
      cantidad = 'items'
    }
  
    if(items<=0){
      document.getElementById('mensaje_sin_productos').style.display='block'
    }
  
    globitoActualizado()
  
  
  
    document.getElementById('totalCarrito').setAttribute('data-total', total)
    document.getElementById('total-items').setAttribute('data-items', items)
    document.getElementById('totalCarrito').innerHTML = `$ ${total}`
    document.getElementById('total-items').innerHTML = `${items} ${cantidad}`
    // JSON.stringify(localStorage.setItem('carrito',carrito))
    
   
    
  
  
  
  
  }
  
  
  const removeItem = (divPadre) => {
  
    let id = divPadre.getAttribute('data-id')
    let carrito = JSON.parse(localStorage.getItem('carrito'))
    let precioOriginal = parseFloat(divPadre.querySelector('.contador').getAttribute('data-precio'))
    let contador = parseInt(divPadre.querySelector('.contador').getAttribute('data-contador'))
    precio = precioOriginal * contador
  
    var productoEncontrado = carrito.findIndex(item => item.id == id)
  
    carrito.splice(productoEncontrado, 1);
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
  
  
    actualizarContador(0, precio, divPadre, precioOriginal, 'borrar', carrito)
    
  
    //como hace para eliminar el item
  
  }
  
  
  const removeAll = () => {
  
    let divs = document.querySelectorAll('.Cart-Items')
  
    divs.forEach((elemento) => {
      removeItem(elemento)
    });
  
  }
  

  
function agregarAlCarrito(btn) {

    var id = document.getElementById('producto_talle').value
    var urlImagen = btn.getAttribute('data-urlImagen');
    var descripcion = btn.getAttribute('data-descripcion');
    var precio = btn.getAttribute('data-precio');
    var cantidad = document.getElementById('producto_cantidad').value
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
    globitoActualizado()
  
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

        Swal.fire({
          title: 'Muchisimas gracias por su compra!',
          showDenyButton: false,
          showCancelButton: false
        }).then((result) => {
          location.reload();
      })
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