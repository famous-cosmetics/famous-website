
const express = require("express");
const AddPartyController = require("../controllers/partiesController/Parties.Controller");
const DeletePartyController = require("../controllers/partiesController/removeParty.controller");
const { getPartyController } = require("../controllers/partiesController/getParties.Controller");

const router = express.Router();







// GET all parties
router.get(
    "/dashboard/Parties-Data",
    getPartyController
);

router.post("/dashboard/add-party", AddPartyController)



router.delete("/dashboard/delete/party/:id", DeletePartyController)









module.exports = router;