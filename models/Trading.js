var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tradingSchema = new Schema({
    timestamp: {
        type: String,
        required: true
    },
    store_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Trading', tradingSchema);