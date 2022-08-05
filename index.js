const express = require('express')
const app = express();

// SETUP MIDDLEWARE
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('./utils/helpers/cors')

// SETUP DOTENV
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
app.use(helmet());
app.enable('trust proxy');


// ROUTES
const userRoutes = require('./routes/user.routes');
const movieRoutes = require('./routes/movies.routes');

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

app.listen(8000, function () {
    console.log("Started application on port %d", 8000);
});