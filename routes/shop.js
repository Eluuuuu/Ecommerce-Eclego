const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shopController')



router.post('/actualizacion-carrito', shopController.actualizarCarrito)//Aca llamo a la funcion del back 


module.exports = (app) => {
    app.use('/carrito', router)//agrego las rutas de user al app del servidor

}