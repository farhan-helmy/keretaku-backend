const Car = require('../models/car')

const registerCar = async (req, res) => {
    const car = new Car(req.body)
    try {

        await car.save()

        res.status(201).send({car})

    } catch (e) {

        console.log(e)
        res.status(400).send(e)

    }

}

module.exports = {
    registerCar
}