
const partyModels = require("../../Models/Party.model");


const AddPartyController = async (req, res) => {
    try {
        console.log("Party Data:", req.body);

        const { name, address, mobile, amount } = req.body;

        const newParty = await partyModels.create({
            name,
            address,
            mobile,
            amount,
        });

        res.status(201).json({
            success: true,
            message: "Party added successfully",
            data: newParty,
        });

    } catch (error) {
        console.error("Party Add Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to add customer",
            error: error.message,
        });
    }
};

module.exports = AddPartyController;