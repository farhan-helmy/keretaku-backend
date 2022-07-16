const healthCheck = (_, res) => {
    try {
        res.status(200).send()
    } catch (e) {
        res.status(404).send()
    }
}

module.exports = {
    healthCheck
}