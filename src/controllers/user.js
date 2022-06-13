const User = require("../models/user");
const emailController = require("./email")

const createUser = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({
            user,
            token,
        });

        await emailController.sendEmail(user.email)
    } catch (e) {
        res.status(400).send(e);
    }
}

const loginUser = async (req, res) => {
    try {
        //console.log(req.body)
        
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({
            user,
            token,
        });
    } catch (e) {
        res.status(400).send();
    }
}

const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
}

const getMe = async (req, res) => {
    const user = req.user
    res.send({
        user
    });
}

const updateMe = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["email", "password"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({
            error: "Invalid updates!",
        });
    }

    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
}




module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getMe,
    updateMe
}