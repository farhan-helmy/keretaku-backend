const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    odometer: {
        type: Number,
        trim: true,
        required: true
    },
    services: [{ name: String}]
}, {
    timestamps: true
})

const Service = mongoose.model("Service", serviceSchema)

module.exports = Service