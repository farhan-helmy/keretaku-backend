const Car = require('../models/car')
const User = require('../models/user')

const registerCar = async (req, res) => {
    
    try {
        const car = await Car.create({
            plate_number: req.body.plate_number
        })
        
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $push: {cars: car._id}},
            {new: true, useFindAndModify: false })

            //console.log(user)
        res.status(201).send(car)

    } catch (e) {

        console.log(e)
        res.status(400).send(e)

    }

}

const getCars = async (req, res) => {
    var message;
    try {
        const car = await User.findById(req.user.id).populate('cars')

        console.log(car.cars)

        if(car.cars.length === 0) {
            message = "no car fucker"
        }else{
            message = "Have car"
        }

        res.status(200).send({car, message})
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    registerCar,
    getCars
}