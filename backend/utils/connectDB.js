const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('some url')
        console.log(`DB connected successfully`)
    } catch (error) {
        console.log(`Error connecting to mongodb, ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB;