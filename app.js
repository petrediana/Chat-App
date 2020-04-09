const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://diana:'
+ process.env.MONGO_ATLAS_PW
+ '@chat-app-jmuhe.mongodb.net/test?retryWrites=true&w=majority',
{
    useMongoClient: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Content-Type, Accept, Origin, X-Requested-With, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE');
    }
    next();
});

app.use((req, res, next) => {
    res.status(200).json({
        message : 'ok'
    });
});

app.use((req, res, next) => {
    const error = new Error('Not found :(');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});


module.exports = app;