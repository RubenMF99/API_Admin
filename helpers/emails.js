const nodemailer = require('nodemailer');
const emailRegistro = async datos =>{
   const {email,name,token} = datos;
   
   const transport = nodemailer.createTransport({
    host: process.env.CONECTION_HOST,
    port: process.env.CONECTION_PORT,
    auth: {
      user: process.env.CONECTION_USER,
      pass: process.env.CONECTION_PASSWORD
    }
  });
 
 
  
  const info = await transport.sendMail({
    from:'"Uptask - Administraor de Proyectos" <cuentas @uptask.com',
    to:email,
    subject:"Uptask - Comprueba tu cuenta",
    html:`<p> Hola ${name} Comprueba tu cuenta</p>
    <p> Tu cuenta esta casi lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND}/confirmar-cuenta/${token}">Confirma tu cuenta</a></p>
    <p>Si tu no creaste esta cuenta, omite este mensaje</p>
    `
  });
}
const emailRecuperacion = async datos =>{
  const {email,name,token} = datos;
  //TODO: Mover a variables de entorno
  const transport = nodemailer.createTransport({
    host: process.env.CONECTION_HOST,
    port: 2525,
    auth: {
      user: process.env.CONECTION_USER,
      pass: process.env.CONECTION_PASSWORD
    }
 });

 const info = await transport.sendMail({
   
   from:'"Uptask - Administraor de Proyectos" <cuentas @uptask.com',
   to:email,
   subject:"Uptask - Reestablece tu contraseña",
   html:`<p> Hola ${name} Reestablece tu contraseña</p>
   <p> Hola sigue el siguiente enlace para reestablecer tu password:
       <a href="${process.env.FRONTEND}/recuperar-password/${token}">Reestablecer Contraseña</a></p>
   <p>Si tu no solicitaste este email, omite este mensaje</p>
   `
 });
}
module.exports  = {
  emailRegistro,
  emailRecuperacion
}



