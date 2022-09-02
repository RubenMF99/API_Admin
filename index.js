const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const Userouter = require("./routes/UsuarioRoutes");
const Prorouter = require("./routes/ProyectoRoutes");
const homeworkRoutes = require("./routes/HomeworkRoutes")
//Conectando a base de datos
const connectDB = require("./config/db");
//ocultando conexion a base de datos
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
connectDB();

//Ruta usuarios
app.use("/api/user",Userouter);
app.use("/api/project",Prorouter);
app.use("/api/homework",homeworkRoutes);

var PORT = process.env.PORT || 4000;

app.listen(PORT,() =>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
})