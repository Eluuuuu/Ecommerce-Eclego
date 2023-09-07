const user=require('./user')//lamo ruta user 
const pages=require('./pages')//llamo las paginas que se renderizan
const products=require('./products')
const categories=require('./categories')
const shop=require('./shop')
const formulario=require('./formularioPago')
const get_products_by_id=require('./get_products_by_id')
const all_products=require('./all_products')
const all_users=require('./all_users')
const get_user_by_id=require('./get_user_by_id')
const delete_user=require('./delete_user')
const alta_user=require('./alta_user')
const modify_user=require('./modify_user')
const alta_product=require('./alta_product')

module.exports = (app)=>{
    pages(app)//las ejecuto y mando la variable app
    user(app)
    products(app)
    categories(app)
    shop(app)
    formulario(app)
    all_products(app)
    get_products_by_id(app)
    all_users(app)
    get_user_by_id(app)
    delete_user(app)
    alta_user(app)
    modify_user(app)
    alta_product(app)
    
};


