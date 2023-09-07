const Sql = require('../db_SQL')
const config = require('../config/config').config



const formulario_pago = async (req, res) => {



    try {
        let query = `INSERT INTO pagos (email, telefono, nombre_completo, dni, direccion, departamento, numero_tarjeta, nombre_completo_tarjeta, codigo_seguridad , metodo_pago) VALUES ('${req.body.email}', '${req.body.telefono}','${req.body.nombre_completo}','${req.body.dni}','${req.body.direccion}','${req.body.departamento}', '${req.body.numeroCard}', '${req.body.nameTarjeta}',  '${req.body.codigoSeguridad}',  '${req.body.metodoPagoSeleccionado}'); SELECT scope_identity() as id`

        let db = new Sql(config)
        let result = await db.ejecutar(query)
        let id_pago=result[0].id
        console.log(id_pago)
        let query_pago=''
        let query_stock=''
        let items=JSON.parse(req.body.items)//cuando mando objetos me vienen en string 
        // let cantidadTotalItems=JSON.parse(req.body.cantidadTotalItems)
       
        for (const item of items) {
            query_pago+=`INSERT INTO detalle_pago (id_pago, id_producto_talle, cantidad, precio_unitario) VALUES ('${id_pago}', '${item.id}', '${item.cantidad}', '${item.precio}'); `

            query_stock+=`update stock set cantidad=cantidad - ${item.cantidad} where id_producto_talles=${item.id};`

        }//el += es para que concatene todos los strings, porque tengo muchos inserts
        
        await db.ejecutar(query_pago + query_stock)
      
        res.status(200).json({ status: 1, message: 'Formulario enviado exitosamente' })
      
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Hubo un error interno en el server' })
    }

}







module.exports = {
    formulario_pago,
    
};