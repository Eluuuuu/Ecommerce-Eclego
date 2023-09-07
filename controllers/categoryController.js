const Sql = require('../db_SQL')
const config = require('../config/config').config


const categories=async(req,res)=>{
try {

    const query = 'select * from Categories where eliminado=0' 

    console.log(query)
    const db = new Sql(config)
    const results = await db.ejecutar(query)

   res.render('./pages/seccion3_categories' , {data: results}) 
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: -1, message: 'Hubo un error interno en el server' })
}
}


module.exports = {
    categories
};