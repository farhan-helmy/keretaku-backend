const Car = require('../models/car')
const User = require('../models/user')

const registerCar = async (req, res) => {

    try {
        const car = await Car.create({
            plate_number: req.body.plate_number
        })

        const user = await User.findByIdAndUpdate(
            req.user._id, {
                $push: {
                    cars: car._id
                }
            }, {
                new: true,
                useFindAndModify: false
            })

        //console.log(user)
        res.status(201).send(car)

    } catch (e) {
        var message
        //console.log(e.code)

        if (e.code === 11000) {
            message = "Car already exist"
        }
        res.status(400).send({
            message
        })

    }

}

const getCars = async (req, res) => {
    var message;
    try {
        const user = await User.findById(req.user.id).populate('cars')

        if (user.cars.length === 0) {
            message = "No car"
        } else {
            message = "Have car"
        }

        res.status(200).send({
            user,
            message
        })
    } catch (e) {
        console.log(e)
    }
}

const getCarInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cars')

        let car = user.cars.find(c => {
            return c.plate_number === req.params["platenumber"]
        })

        //console.log(car)
        if (car === undefined) {
            car_info = false
        } else {
            car_info = car
        }

        //console.log(car_info)
        res.status(200).send(car_info)

    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    registerCar,
    getCars,
    getCarInfo
}