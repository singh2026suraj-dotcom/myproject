const mongoose = require('mongoose');

// Atlas — replace <db_password> with your real database password
const MONGODB_URI =
    'mongodb+srv://singh2026suraj_db_user:GRIMMJOW@cluster0.flz75ul.mongodb.net/acc?retryWrites=true&w=majority';

async function connectDB() {
    await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 30000,
        dbName: 'acc',
    });
    console.log('MongoDB Atlas connected — database: acc, collection: acc-data');
}

module.exports = connectDB;
