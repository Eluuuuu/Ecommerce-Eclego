const categories = async () => {



  try {
    const url = `http://localhost:3060/categories`

    const response = await fetch(url);
    const data = await response.text();

    document.getElementById('seccion3_categories').innerHTML = data

  }

  catch (error) {
    console.log(error)
  }
}

document.querySelectorAll('.categories').forEach(element => {
  element.addEventListener('click', function () {
    document.querySelector('.section3').style.display = 'block'
    document.querySelector('.section3').scrollIntoView({ behavior: 'smooth' });
  });
})




window.addEventListener('load', function () {
  // Aquí colocas el código de la función que quieres ejecutar
  document.getElementById('icono_carrito').addEventListener('click', function () {
    document.getElementById('carrito').classList.toggle('oculto')
  }

  )
  
  globitoActualizado()
  
  categories()
  

  
});





const globitoActualizado=()=>{

  let carrito=JSON.parse(localStorage.getItem('carrito'))

  let totalCantidades = carrito.reduce((acumulador, producto) => {
    return acumulador + producto.cantidad;
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

 
  if (operador == 'borrar') {
    total-=precio
  } else if (operador === 'suma') {
    total += precioOriginal
    items += 1
    console.log(items)
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































// if (localStorage.getItem("id_user")) {
//   console.log('usuario logeado')

// } else {
//   location.href = 'login'
// }


