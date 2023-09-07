const Sql = require('../db_SQL')
const config = require('../config/config').config



const getProducts = async (req, res) => {

    try {

        const query = `select * from Products where eliminado=0 and id_categoria=${req.params.id}`// categoria uno tiene id 1 , entonces me trae los productos por categoria, ejemplo todas las remeras q son categoria uno

        const db = new Sql(config)
        const results = await db.ejecutar(query)
        console.log(results)

             return { status: 1, message: 'Productos obtenidos exitosamente', results }
          //  res.render('./pages/formulario' , {data: results}) 
    } catch (error) {
        console.log(error)
        return { status: -1, message: 'Hubo un error interno en el server', results: [] }
    }

};


const all_products = async (req, res) => {

    try {

        let query = `
        Select p.id, p.descripcion, sz.talle, p.precio, p.sexo, s.cantidad from products as p 
        Inner join products_size as ps on ps.id_producto=p.id 
        inner join sizes as sz on sz.id= ps.id_talle 
        inner join stock as s on s.id_producto_talles = ps.id
        order by p.descripcion`

        
        const db = new Sql(config)
        let results = await db.ejecutar(query)

        // res.render('pages/formulario',{results} )
        return { status: 1, message: 'Productos obtenidos exitosamente', results }
    } catch (error) {
        console.log(error)
        return { status: -1, message: 'Hubo un error interno en el server', results: [] }
    }

};


const get_products_by_id = async (req, res) => {


    try {

        let id=req.query.id
        console.log(id)

        let query = `Select p.id, p.descripcion,sz.talle, p.precio, p.sexo, s.cantidad from products as p 
        Inner join products_size as ps on ps.id_producto=p.id 
        inner join sizes as sz on sz.id= ps.id_talle 
        inner join stock as s on s.id_producto_talles = ps.id where p.id=${id} order by p.descripcion`
        console.log(query)
        const db = new Sql(config)
        let results = await db.ejecutar(query)
        console.log(results)

res.render('pages/formulario',{data: results} )//render es para redireccionar a una pagina
    // res.status(200).json({ status: 1, message: 'Producto obtenido exitosamente', results }) el status devuelve un objeto al front
    

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Hubo un error interno en el server' })
    }

}




const get_products_detail_by_id = async (req, res) => {


    try {

        let id=req.params.id||req.query.id||'0'

        let query = `Select p.id, p.descripcion, p.detalle , p.url_imagen, p.precio,STRING_AGG ( concat(ps.id, '|', sz.talle, ' Disponibles: ', s.cantidad) , ',') as talles from products as p 
        Inner join products_size as ps on ps.id_producto=p.id 
        inner join sizes as sz on sz.id= ps.id_talle 
        inner join stock as s on s.id_producto_talles = ps.id 
        where p.id=${id}
        group by p.descripcion , p.precio, p.url_imagen , p.detalle, p.id`
        console.log(query)
        const db = new Sql(config)
        let results = await db.ejecutar(query)
        console.log(results)
        let data=results[0]
        let talles=[]


        if(data.talles.includes(',')){
            talles=data.talles.split(',')//transforma array
        }else{
            talles.push(data.talles)
        }
       
        let array_talles=[]

        for (const t of talles) {

            id=t.split('|')[0]
            descripcion=t.split('|')[1]
            array_talles.push({id,descripcion})
            
        }


        data.talles=array_talles//el primero es data.talles y la otra una variable local y ahi pasa a ser array



    // res.status(200).json({ status: 1, message: 'Producto obtenido exitosamente', results }) el status devuelve un objeto al front
    return(data)

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Hubo un error interno en el server' })
    }

}

const alta_product = async (req, res) => {
   
    try {
        const db = new Sql(config)

        let query = `INSERT INTO products (descripcion, precio, sexo) VALUES ('${req.body.descripcion_producto}', ${req.body.precio_producto},'${req.body.sexo}'); SELECT scope_identity() as id`
        
        
        let result = await db.ejecutar(query)
        let id_producto=result[0].id// porque el scope me devuelve un array de una posicion con un objeto.
        
        
        query=`INSERT INTO products_size (id_producto,id_talle) VALUES (${id_producto},${req.body.talle});SELECT scope_identity() as id`
        
        console.log(query)
        let results_id_producto_talle = await db.ejecutar(query)
        let id_producto_talle=results_id_producto_talle[0].id

        query=`INSERT INTO stock (id_producto_talles,cantidad) VALUES (${id_producto_talle},${req.body.stock})`

        await db.ejecutar(query) 
    
    
    res.status(200).json({ status: 1, message: 'Usuario insertado exitosamente', id_producto }) //el status devuelve un objeto al front
    

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Hubo un error interno en el server' })
    }

}



module.exports = {
    getProducts,
    all_products,
    get_products_by_id,
    get_products_detail_by_id,
    alta_product
};