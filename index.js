const express = require('express')
const app = express();

// SETUP MIDDLEWARE
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('./utils/helpers/cors')

// SETUP DOTENV
const dotenv = require('dotenv');
dotenv.config();

// SETUP MONGOOSE
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
app.use(helmet());
app.enable('trust proxy');


// ROUTES
const userRoutes = require('./routes/user.routes');
const movieRoutes = require('./routes/movies.routes');
const billingsRoutes = require('./routes/billings.routes');
const ratingsRoutes = require('./routes/ratings.routes');


app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/billings', billingsRoutes);
app.use('/ratings', ratingsRoutes);

app.listen(8000, function () {
    console.log("Started application on port %d", 8000);
});