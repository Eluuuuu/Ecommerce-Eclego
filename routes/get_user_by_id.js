const express=require('express')
const router=express.Router()
const administracion_usuarios=require('../controllers/administracion_usuarios')


router.get('/:id', administracion_usuarios.get_user_by_id)



module.exports = (app)=>{
    app.use('/',router)

}