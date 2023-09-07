const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')



router.get('/verificar-login', userController.verificarLogin)

router.post('/sign-in', userController.registrarse)//Aca llamo a la funcion del back 


module.exports = (app) => {
    app.use('/user', router)//agrego las rutas de user al app del servidor
}