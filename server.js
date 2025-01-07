const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const myPath = require('./helpers/mypath');

require('dotenv').config();


const { red, blue, green, bgWhite, whiteBright, bgBlue, bgBlack } = require('colorette');

const postApiRoutes = require('./routes/api-post-routes');

const mongoose = require('mongoose');


mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log(bgWhite(green('Connected to DB'))))
    .catch((error) => console.log(bgWhite(red(error))));

const app = express();

app.set('view engine', 'ejs'); 

app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(bgWhite(green(`Listening on ${process.env.PORT}`)));
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(myPath('index'), {title});
});

app.use((req, res) => {
    const title = 'Error';
    res
        .status(404)
        .render(myPath('error'), {title});
});


