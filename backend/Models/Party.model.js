

const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true
    }

)



const partyModels = mongoose.model("Party-Collection", partySchema);

module.exports = partyModels;