const signIn = async () => {
    console.log('hizo click')
    try {

        let name = document.getElementById('name').value
        let lastName = document.getElementById('lastName').value
        let password = document.getElementById('password').value
        let email = document.getElementById('email').value
        let usuarioExistente= document.getElementById('usuarioExistente')
        
    
        const url = "http://localhost:3060/user/sign-in";

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({name, lastName, password, email}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);

        if (data.status === 1) {

            location.href = 'login'

        }else{
        usuarioExistente.innerHTML=data.message
        }


    } catch (error) {
        console.log(error)
        console.log("Hubo un error");
    }

}

