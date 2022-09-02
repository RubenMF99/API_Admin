const mongoose = require("mongoose");


const connectDB = async () =>{
    try {
        const conection = await mongoose.connect(
            process.env.DB_CONNECT,
            {
                useNewUrlParser:true,
                useUnifiedTopology:true,
            }
            );
       ;
       console.log("Conexion establecida");
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB