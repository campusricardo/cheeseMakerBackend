const { Schema, model } = require('mongoose');
const CheeseSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    price: {
        type: Number,
        required: true,

    },
    category: {
        type: Schema.Types.ObjectId
    },
    description: {

        type: String,
        required: true

    },
    avaliable: {
        type: Boolean,
        required: true,
        default: true
    }
});



module.exports = model( 'cheeses', CheeseSchema );
