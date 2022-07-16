const mongoose = require('mongoose')

const testConnection = () => {
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(
            process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            () => console.log(" Mongoose is connected"),
        );
    } catch (e) {
        console.log(e)
    }
}

testConnection()