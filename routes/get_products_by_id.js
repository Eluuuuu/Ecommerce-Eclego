const express=require('express')
const router=express.Router()
const productController=require('../controllers/productController')


router.get('/:id', productController.get_products_by_id)



module.exports = (app)=>{
    app.use('/get_products_by_id', router)
}