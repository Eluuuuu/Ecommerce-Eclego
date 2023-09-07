const express=require('express')
const router=express.Router()
const administracion_usuarios=require('../controllers/administracion_usuarios')


router.post('/', administracion_usuarios.alta_user)



module.exports = (app)=>{
    app.use('/alta_user',router)

}