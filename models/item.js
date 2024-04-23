const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    quantity: { type: Number, required: true, min: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true,}, 
    series: { type: Schema.Types.ObjectId, ref: 'Series', required: true },
});

ItemSchema.virtual('url').get(function () {
    return `/inventory/item/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
