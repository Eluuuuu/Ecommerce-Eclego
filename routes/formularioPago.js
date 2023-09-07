const express=require('express')
const router=express.Router()
const formularioController = require('../controllers/formularioController')




router.post('/', formularioController.formulario_pago)



module.exports = (app)=>{
    app.use('/pago',router)
   
}