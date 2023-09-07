const express=require('express')
const router=express.Router()
const  categoryController = require('../controllers/categoryController')




router.get('/', categoryController.categories)


module.exports = (app)=>{
    app.use('/categories',router)//agrego las rutas de user al app del servidor
}