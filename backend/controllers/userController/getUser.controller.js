

const getUserController = (req, res) => {
    res.send({
        status: "success",
        message: "get all of the users"
    })
}


module.exports = getUserController;