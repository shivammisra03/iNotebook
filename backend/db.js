const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'


const connectToMongo = async () => {
    mongoose.connect(mongoUri, () => {
        console.log('Connected to mongo successfully')
    })
}


module.exports = connectToMongo;