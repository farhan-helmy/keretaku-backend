const AWS = require("aws-sdk")
const SES_CONFIG = {
    accessKeyId: process.env.SES_ACCESS_KEY,
    secretAccessKey: process.env.SES_SECRET,
    region: 'ap-southeast-1',
}

const AWS_SES = new AWS.SES(SES_CONFIG);


const sendEmail = (recepientEmail) => {
    let params = {
        Source: 'farhan@mybengkel.co',
        Destination: {
            ToAddresses: [
                recepientEmail
            ],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: 'Hello, welcome to mybengkel! Im Farhan, myBengkel developer.',
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: "Hello, welcome to mybengkel!",
            }
        },
    };
    return AWS_SES.sendEmail(params).promise();
}

module.exports = {
    sendEmail
}