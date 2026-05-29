const mongoose = require('mongoose');

const accDataSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { collection: 'acc-data' }
);

module.exports = mongoose.model('AccData', accDataSchema);
