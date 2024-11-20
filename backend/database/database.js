const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_CLUSTER}/doctor_appointment`,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected to database successfully");
    } catch (err) {
        console.log("Error connecting to database");
    }
}

module.exports = connectDB;