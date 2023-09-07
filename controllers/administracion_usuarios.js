const Sql = require('../db_SQL')
const config = require('../config/config').config


const all_users = async (req, res) => {

    try {

        let query = 'Select id, email, name, lastName from users'

        
        const db = new Sql(config)
        let results = await db.ejecutar(query)

        // res.render('pages/formulario',{results} )
        return { status: 1, message: 'Productos obtenidos exitosamente', results }
    } catch (error) {
        console.log(error)
        return { status: -1, message: 'Hubo un error interno en el server', results: [] }
    }

};

const get_user_by_id = async (req, res) => {


    try {

        let id=req.query.id
       

        if(id!=undefined){

        let query = `Select email, name , lastName from users where id=${id}`
        console.log(query)

        const db = new Sql(config)
        let results = await db.ejecutar(query)
        console.log(results)

     
     res.render('pages/formulario_usuarios',{data: results} )

 }else{

    res.render('pages/formulario_usuarios', {data: []})

 }
    
     //render es para redireccionar a una pagina
    // res.status(200).json({ status: 1, message: 'Producto obtenido exitosamente', results }) //el status devuelve un objeto al front
    

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Hubo un error interno en el server' })
    }

}


const delete_user = async (req, res) => {



    try {

        let id=req.query.id

      

        let query = `Delete from users where id=${id}`

        console.log(query)
        const db = new Sql(config)
        let results = await db.ejecutar(query)
        console.log(results)

    
    
    res.status(200).json({ status: 1, message: 'Usuario eliminado exitosamente', results }) //el status devuelve un objeto al front
    

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Hubo un error interno en el server' })
    }

}




const alta_user = async (req, res) => {
   
    try {

        let query = `INSERT INTO users (email, name, lastName) VALUES ('${req.body.email}', '${req.body.name}','${req.body.lastName}')`

        console.log(query)
        const db = new Sql(config)
        let results = await db.ejecutar(query)
        console.log(results)

    
    
    res.status(200).json({ status: 1, message: 'Usuario insertado exitosamente', results }) //el status devuelve un objeto al front
    

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Hubo un error interno en el server' })
    }

}

const modify_user = async (req, res) => {
   
    try {

        let query = `update users set email='${req.body.email}', name='${req.body.name}', lastName='${req.body.lastName}' where id=${req.query.id} `

        console.log(query)
        const db = new Sql(config)
        let results = await db.ejecutar(query)
        console.log(results)

    
    
    res.status(200).json({ status: 1, message: 'Usuario actualizado exitosamente', results }) //el status devuelve un objeto al front
    

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Hubo un error interno en el server' })
    }

}





module.exports={
    all_users,
    get_user_by_id,
    delete_user,
    alta_user,
    modify_user
}