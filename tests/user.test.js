const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/user")
const {
    normalUserId,
    normalUser,
    setupDatabase,
    resetDatabase
} = require('./fixtures/db')


beforeEach(setupDatabase)

afterAll(resetDatabase);

test('Should signup a new user', async () => {
    const response = await request(app).post('/v1/users/register').send({   
        email: 'farhandota@example.com',  
        password: 'MyPass777!'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            email: 'farhandota@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass777!')
})
