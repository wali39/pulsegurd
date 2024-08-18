const { default: mongoose } = require("mongoose");


require("dotenv").config();
const connectDB = () => {

    mongoose.connect(process.env.MDB_URL, {
        useNewUrlParser: true,
        useUnifiedtopology: true,
    }).then(() => {
        console.log("Connected to MongoDB")
    }).catch((err) => {
        console.log(err);
    })
}
module.exports = connectDB;