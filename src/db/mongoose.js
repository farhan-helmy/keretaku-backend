const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URL,
    () => console.log(" Mongoose is connected"),
);