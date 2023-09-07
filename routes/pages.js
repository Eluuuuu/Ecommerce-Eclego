const express=require('express')
const router=express.Router()
const productController=require('../controllers/productController')
const administracion_usuarios=require('../controllers/administracion_usuarios')




router.get('/login', (req, res) => {
    try {
        res.render('pages/login')
    } catch (error) {
        console.log(error)
    }

})


router.get('/registrarse', (req, res) => {
    try {
        res.render('pages/registrarse')
    } catch (error) {
        console.log(error)
    }

})

router.get('/index', (req, res) => {
    try {
        res.render('pages/index')
    } catch (error) {
        console.log(error)
    }

})


router.get('/shop/:id', async (req, res) => {
    try {
        const data= await productController.getProducts(req)//me agarra los productos de tal categoria
        res.render('pages/shop',{data: data.results})
    } catch (error) {
        console.log(error)
    }

})

router.get('/shop/detalle-producto/:id', async (req, res) => {
    try {
        const results= await productController.get_products_detail_by_id(req)//me agarra los productos de tal categoria
        res.render('pages/detalle_producto',{data: results})
    } catch (error) {
        console.log(error)
    }

})




router.get('/formulario', async (req, res) => {
    try {
        const data= await productController.get_products_by_id()
        res.render('pages/formulario',{data: data.results} )
    } catch (error) {
        console.log(error)
    }

})


router.get('/productos_stock', async (req, res) => {
    try {
        const data= await productController.all_products()//aca se ejecuta la funcion que hace el fetch
        console.log(data)
        res.render('pages/productos_stock', {data: data.results})
    } catch (error) {
        console.log(error)
    }

})


router.get('/all_users', async (req, res) => {
    try {
        const data= await administracion_usuarios.all_users()//aca se ejecuta la funcion que hace el fetch
        console.log(data)
        res.render('pages/administracion_usuarios', {data: data.results})
    } catch (error) {
        console.log(error)
    }

})


router.get('/formulario_usuarios', async (req, res) => {
    try {
        res.render('pages/formulario_usuarios')
    } catch (error) {
        console.log(error)
    }

})



module.exports = (app)=>{
    app.use('/',router);
};
