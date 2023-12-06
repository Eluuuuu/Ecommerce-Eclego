const all_products = async () => {

    try {
        const url = `http://localhost:3060/all_products`;
        // Lo tomo por parametro para saber si esos datos coinciden con los datos de la base

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const info=data.results
        console.log(data.results);
        return info


    }catch (error) {
        console.log(error)
    }
}

const row_selected= async (fila)=>{

    console.log(fila)

    const id = fila.getAttribute('data-id'); // Alternativamente: fila.dataset.id;
    console.log(id)


    if (document.getElementsByClassName("row_selected")[0]) {
        document
          .getElementsByClassName("row_selected")[0]
          .classList.remove("row_selected");
      } //si hay una row seleccionada le saca la clase y se la agrega a otra
  
      fila.classList.add("row_selected");

  get_products_by_id(id)

}

const get_products_by_id= async (id)=>{
    console.log(id)
    try {
        const url = `http://localhost:3060/get_products_by_id/get_products_by_id?id=${id}`;
        // Lo tomo por parametro para saber si esos datos coinciden con los datos de la base
    
        const response = await fetch(url);
        console.log(response)
        const data = await response.text();
        console.log(data)
        

        document.getElementById('contenidoFormulario').innerHTML=data


    
    
    }catch (error) {
        console.log(error)
    }

}

const alta_product = async ()=>{

    let descripcion_producto=document.getElementById('producto_descripcion').value
    console.log(descripcion_producto)
    let precio_producto=document.getElementById('producto_precio').value
    console.log(precio_producto)
    let sexo=document.getElementById('sexo').value
    console.log(sexo)
    let talle=document.getElementById('talle').value
    console.log(talle)
    let stock=document.getElementById('stock').value
    console.log(stock)




    try {
        const url = `http://localhost:3060/alta_product`;
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({descripcion_producto,precio_producto,sexo,talle,stock}),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("Hubo un error");
      }

    //   location.reload()


    }


    document.getElementById("imagen_producto").addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              document.getElementById("imagePreview").src = e.target.result;
          };
          reader.readAsDataURL(file);
      } else {
          // Manejo si no se selecciona ningún archivo o se cancela la selección.
          document.getElementById("imagePreview").src = '';
      }
  });


  const control_stock=()=>{

    window.location.href = "/productos_stock"



  }





