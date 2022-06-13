const mongoose = require("mongoose");
const {
    nanoid
} = require("nanoid");


const carSchema = new mongoose.Schema({
    plate_number: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    services: [{ type: String, ref: 'Service' }],
},{
    timestamps: true
})

const Car = mongoose.model("Car", carSchema)

module.exports = Car