const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

SeriesSchema.virtual('url').get(function () {
    return `/inventory/series/${this._id}`;
});

module.exports = mongoose.model('Series', SeriesSchema);
