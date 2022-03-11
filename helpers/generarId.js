
const generarId = ()=>{
    const id = Math.random().toString(32).substring(2);
    const fecha = Date.now().toString(32);
    return id+fecha;
}

module.exports = generarId
