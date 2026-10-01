

const createUserController = (req, res) => {
    res.send({
        status: "success",
        message: "user Created successfully"
    })
}


module.exports = createUserController