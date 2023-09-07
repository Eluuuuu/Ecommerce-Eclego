const all_users = async () => {

    try {
        const url = `http://localhost:3060/all_users`;
        // Lo tomo por parametro para saber si esos datos coinciden con los datos de la base

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const info = data.results
        console.log(data.results);
        return info


    } catch (error) {
        console.log(error)
    }
}


const row_selected = async (fila) => {

    console.log(fila)

    const id = fila.getAttribute('data-id'); // Alternativamente: fila.dataset.id;
    console.log(id)


    if (document.getElementsByClassName("row_selected")[0]) {
        document
            .getElementsByClassName("row_selected")[0]
            .classList.remove("row_selected");
    } //si hay una row seleccionada le saca la clase y se la agrega a otra

    fila.classList.add("row_selected");

    get_user_by_id(id)

}

const get_user_by_id = async (id) => {

    if(id!=undefined){


        try {
            const url = `http://localhost:3060/get_user_by_id?id=${id}`;
            // Lo tomo por parametro para saber si esos datos coinciden con los datos de la base
           
            const response = await fetch(url);
        
            const data = await response.text();
          
    
    
            document.getElementById('planilla_usuarios').innerHTML = data

    
        } catch (error) {
            console.log(error)
        }
        
    }else{

        let email=document.getElementById('email')
       
        let name=document.getElementById('name')
      
        let lastName=document.getElementById('lastName')

        email.value=""
        name.value=""
        lastName.value=""
     

    }
 

}



const delete_user = async () => {

    let id = document.getElementsByClassName("row_selected")[0].getAttribute("data-id");
    console.log(id);
    
    try {
        const url = `http://localhost:3060/delete_user?id=${id}`;
        const response = await fetch(url, {
            method: "DELETE",
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

    location.reload()

}


const alta_user = async ()=>{

    let email=document.getElementById('email').value
    console.log(email)
    let name=document.getElementById('name').value
    console.log(name)
    let lastName=document.getElementById('lastName').value
    console.log(lastName)




    try {
        const url = `http://localhost:3060/alta_user`;
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({email,name,lastName}),
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

      location.reload()


    }

const modify_user = async ()=>{


    
    let id = document.getElementsByClassName("row_selected")[0].getAttribute("data-id");
    
    

    let email=document.getElementById('email').value
    console.log(email)
    let name=document.getElementById('name').value
    console.log(name)
    let lastName=document.getElementById('lastName').value
    console.log(lastName)




    try {
        const url = `http://localhost:3060/modify_user?id=${id}`;
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify({email,name,lastName}),
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

      location.reload()

      
    }




