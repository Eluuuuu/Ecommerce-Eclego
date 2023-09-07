const express=require('express')
const router=express.Router()
const productController=require('../controllers/productController')



// router.get('/:id', productController.getProducts)



module.exports = (app)=>{
    app.use('/products',router)//agrego las rutas de user al app del servidor
}