//require('../db/mongoose_test')
const Service = require('../models/service')


const createService = async () => {

    try {
        const create = await Service.create({
            odometer: 1234,
            services: [{
                name: 'Basuh kete'
            }, {
                name: 'tukar mintak hitam'
            }]
        })

        console.log(create)

    } catch (e) {
        console.log(e)
    }
}

//createService()
module.exports = {
    createService
}