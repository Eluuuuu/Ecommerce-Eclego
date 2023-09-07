const express=require('express')
const router=express.Router()
const administracion_usuarios=require('../controllers/administracion_usuarios')



router.get('/', administracion_usuarios.all_users)





module.exports = (app)=>{
    app.use('/',router)//agrego las rutas de user al app del servidor
 

}