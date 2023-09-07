const express=require('express')
const router=express.Router()
const administracion_usuarios=require('../controllers/administracion_usuarios')


router.delete('/:id', administracion_usuarios.delete_user)



module.exports = (app)=>{
    app.use('/',router)

}