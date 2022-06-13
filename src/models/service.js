const mongoose = require("mongoose");
const {
    nanoid
} = require("nanoid");


const serviceSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => nanoid(5),
    },
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