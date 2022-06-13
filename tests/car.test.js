const request = require("supertest")
const app = require("../src/app")
const Car = require("../src/models/car")
const {
    setupDatabase,
    resetDatabase,
    normalUser
} = require('./fixtures/db')


beforeEach(setupDatabase)

afterAll(resetDatabase);

test('Should add a new car', async () => {
    const response = await request(app)
    .post('/v1/car/register')
    .set("Authorization", `Bearer ${normalUser.tokens[0].token}`)
    .send({
        plate_number: "WUR6262"
    }).expect(201)

    // Assert that the database was changed correctly
    const car = await Car.findById(response.body._id)
    expect(car).not.toBeNull()

    // Assertions about the response
    // expect(response.body).toMatchObject({
    //     user: {
    //         email: 'farhandota@example.com'
    //     },
    //     token: user.tokens[0].token
    // })
    // expect(user.password).not.toBe('MyPass777!')
})

test('Should get all cars', async () => {
    const response = await request(app)
    .get('/v1/cars')
    .set("Authorization", `Bearer ${normalUser.tokens[0].token}`)
    .expect(200)

    const car = await Car.findById(response.body.car.cars[0]._id)
    expect(car).not.toBeNull()
})