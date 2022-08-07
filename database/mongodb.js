const mongoose = require('mongoose')

const main = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.hg9jp.mongodb.net/test`);
        console.log('Connected to database')
    } catch (error) {
        console.log('Error connecting to db' + error)
    }
}

main();
