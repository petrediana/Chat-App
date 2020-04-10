const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.find()
    .select('_id name')
    .exec()
    .then(docs => {
        console.log('From db: ' + docs);  
        if (docs.length > 0) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message : 'No data available'
            });
        }
    })
    .catch(err => {
        console.warn(err);
        res.status(500).json({
            error : err
        });
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
    .exec()
    .then(doc => {
        console.log('From db: ' + doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message : 'not found :('
            });
        }
    })
    .catch(err => {
        console.warn(err);
        next(err);
        res.status(500).json({
            error : err
        });
    });
});

router.post('/', (req, res, next) => {
    try {
        const dbUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name
        });
        dbUser.save();
        res.status(201).json({
            message: 'Created user',
            createdUser: dbUser
        });
    } catch(err) {
        next(err);
    }
});

module.exports = router;