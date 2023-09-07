const logIn = async () => {

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let mensajeError=document.getElementById('mensajeError')

    try {
        const url = `http://localhost:3060/user/verificar-login?email=${email}&password=${password}`;
        // Lo tomo por parametro para saber si esos datos coinciden con los datos de la base

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.status===1){
            localStorage.setItem("id_user", data.id)
            localStorage.setItem("carrito", '[]' )
            location.href='index'
            
        }else{
            mensajeError.innerText= data.message

        }
        }

    catch (error) {
        console.log(error)
    }
}

if(localStorage.getItem("id_user")){
    console.log('usuario logeado')
   location.href='index'

 }