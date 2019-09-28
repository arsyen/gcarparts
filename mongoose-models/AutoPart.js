const mongoose = require('mongoose');

const AutoPart = mongoose.model('autoPart',
    {
        carBrandId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        carModelId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        carBrand: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        carModel: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        years: {
            type: [Number],
            required: false
        },
        name: {
            type: String,
            required: true
        },
        serial: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        inStock: {
            type: Boolean,
            required: true
        },
    });

module.exports = AutoPart;