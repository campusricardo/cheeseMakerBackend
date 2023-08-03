const Categoria  = require('../models/Categoria.js');  
const getCategoria = async(req, res) => {
    
    const categoria = await Categoria.find();

    res.json(categoria);
}

const postCategoria = async(req, res ) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if ( categoriaDB ) {
       return res.status(400).json({
             msg: `La categoria ${ categoriaDB.nombre }, ya existe`
         });
     }
   /*  console.log("usuario:",usuario); */
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    
     const categoria = new Categoria(data);
     // Guardar DB
    await categoria.save();

     res.status(201).json(categoria);

}

const deleteCategoria = async(req, res) => {
    try {
        const {id} = req.params;
        const categoria = await Categoria.findByIdAndUpdate( id, { estado: false } );
        res.status(204).send();
    } catch (error) {
        res.status(404);
        res.send({error: "Categoria no encontrada"})
    }
}


const putCategoria = async(req, res) => {
    try {
        
        const {id} = req.params;
        const {nombre} = req.body;
        const categoria = await Categoria.findByIdAndUpdate(id,{nombre});
      console.log(categoria);


        await categoria.save();
        res.send(categoria);
    } catch (error) {
        res.status(404);
        res.send({error: "categoria no existe"})
    }
}



module.exports = {
    getCategoria,
    postCategoria,
    deleteCategoria,
    putCategoria
}