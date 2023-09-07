const express=require('express')
const router=express.Router()
const productController=require('../controllers/productController')



router.get('/', productController.all_products)




module.exports = (app)=>{
    app.use('/all_products',router)//agrego las rutas de user al app del servidor

}