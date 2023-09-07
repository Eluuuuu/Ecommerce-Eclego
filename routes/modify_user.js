const express=require('express')
const router=express.Router()
const administracion_usuarios=require('../controllers/administracion_usuarios')


router.put('/:id', administracion_usuarios.modify_user)



module.exports = (app)=>{
    app.use('/',router)

}