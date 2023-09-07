

const actualizarCarrito = async (req, res) => {

    let productos = req.body.productos

    try {


        res.render('./pages/carrito', { productos })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Hubo un error interno en el server' })
    }

}



       


module.exports = {
    actualizarCarrito,
  
};