const Sql = require('../db_SQL')
const config = require('../config/config').config



const verificarLogin = async (req, res) => {
    try {
        const query = `select * from Users where email='${req.query.email}' and password='${req.query.password}' and eliminado=0`
        const db = new Sql(config)
        const result = await db.ejecutar(query)

        console.log(result)

        if (result.length > 0) {

            res.status(200).json({ status: 1, message: 'Usuario correcto', id: result[0].id })

        } else {

            res.status(401).json({ status: -1, message: 'Usuario incorrecto' })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}



const registrarse = async (req, res) => {



    try {
        let query = `select * from Users where email='${req.body.email}' and password='${req.body.password}' and eliminado=0`
        let db = new Sql(config)
        let result = await db.ejecutar(query)

        if (result.length > 0) {
            res.status(200).json({ status: 0, message: 'Ya existe un usuario con el email ingresado' })
        } else {

            query = `INSERT INTO Users (name, lastName, email, password) VALUES ('${req.body.name}', '${req.body.lastName}', '${req.body.email}', '${req.body.password}')`

            result = await db.ejecutar(query)


            res.status(200).json({ status: 1, message: 'Usuario registrado correctamente', id: result })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Hubo un error interno en el server' })
    }

}


module.exports = {
    verificarLogin,
    registrarse
};