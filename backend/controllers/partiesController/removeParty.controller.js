const partyModels = require("../../Models/Party.model");



// DELETE - Remove Party
const DeletePartyController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedParty = await partyModels.findByIdAndDelete(id);

        if (!deletedParty) {
            return res.status(404).json({
                success: false,
                message: "Party not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Party removed successfully",
            data: deletedParty,
        });

    } catch (error) {
        console.error("Delete Party Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to remove party",
            error: error.message,
        });
    }
};



module.exports = DeletePartyController;