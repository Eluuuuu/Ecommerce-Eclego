const express = require('express')
const app = express()

const routes_master = require('./routes/index')//llamo a index porque ahi tengo todas las rutas

const cors = require('cors');



app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.use(express.static('public'))


routes_master(app)//Lo pongo aca,donde se ejecuta para que app reconozca las rutas del index


const nodemailer = require('nodemailer');

// Configurar el transporter para enviar correos a través de Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'eluu300@gmail.com', // Coloca aquí tu dirección de Gmail
    pass: 'vuduyqrwvqpcakwj' // Coloca aquí tu contraseña de Gmail
  }
});


app.get('/enviar_email', (req, res) => {
    const mailOptions = {
      from: 'eluu300@gmail.com',
      to: req.query.email,
      subject: 'Compra realizada',
      text: 'Compra realizada con exito',
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo');
      } else {
        console.log('Correo enviado correctamente:', info.response);
        res.send('Correo enviado correctamente');
      }
    });
  });



let port = 3060

app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port}`)
})
