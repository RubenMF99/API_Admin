
const nodemailer = require('nodemailer');
const emailRegistro = async datos =>{
   const {email,name,token} = datos;
   const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pruebasUptask@gmail.com",
      pass: "pruebasUptask99"
    }
  });

  //TODO: Mover a variables de entorno
  //*Important: 
  //!Deprecated
  //?
  
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
  const transport = nodemailer.createTransport({
   service: "gmail",
   auth: {
     user: "pruebasUptask@gmail.com",
     pass: "pruebasUptask99"
   }
 });

 const info = await transport.sendMail({
   
   from:'"Uptask - Administraor de Proyectos" <cuentas @uptask.com',
   to:email,
   subject:"Uptask - Reestablece tu contraseña",
   html:`<p> Hola ${name} Reestablece tu cuenta</p>
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



