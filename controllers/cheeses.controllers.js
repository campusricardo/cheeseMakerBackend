const Cheese  = require('../models/cheeses.js'); 
const Category = require('../models/Categoria.js');
const getCheese = async(req, res) => {
    
    const cheese = await Cheese.find();

    res.json(cheese);
}

const postCheese = async(req, res ) => {
    
    const name = req.body.name.toUpperCase();
    const id = req.usuario._id;
    console.log(id);
    const {state,price,description,avaliable} = req.body;
    const cheese = await Cheese.findOne({name});
     const category = await Category.findOne({usuario: id});
     console.log(category);
    
    const data = {
        name,
        state,
        user: id,
        price,
        category ,
        description,
        avaliable
    }

    
     const cheesexd = new Cheese(data);
    await cheesexd.save();

     res.status(201).json(Cheese);

}

const deleteCheese = async(req, res) => {
    try {
        const {id} = req.params;
        const Cheese = await Cheese.findByIdAndUpdate( id, { state: false } );
        res.status(204).send();
    } catch (error) {
        res.status(404);
        res.send({error: "Cheese no encontrada"})
    }
}


const putCheese = async(req, res) => {
    try {
        
        const {id} = req.params;
        const {name, price, description} = req.body;
        const Cheese = await Cheese.findByIdAndUpdate(id,{name});
      console.log(Cheese);

        await Cheese.save();
        res.send(Cheese);
    } catch (error) {
        res.status(404);
        res.send({error: "Cheese no existe"})
    }
}



module.exports = {
    getCheese,
    postCheese,
    deleteCheese,
    putCheese
}