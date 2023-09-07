const express=require('express')
const router=express.Router()
const productController=require('../controllers/productController')


router.post('/', productController.alta_product)



module.exports = (app)=>{
    app.use('/alta_product',router)

}