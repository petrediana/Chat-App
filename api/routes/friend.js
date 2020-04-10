const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Friend = require('../models/friend');
const User = require('../models/user');

router.get('/', (req, res, next) => {
    Friend.find()
    .select('_id name userId')
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

// get a specific user's friends
router.get('/user-friends/:userId', async (req, res, next) => {
    try {
        const allFriendships = await Friend.find();
        const userIdParam = req.params.userId;
        const inputUserFriendsId = allFriendships.map(friendship => {
            if (friendship.userId == userIdParam) {
                return friendship._id;
            }
        });

        console.log(inputUserFriendsId)
        console.log('\n');
        
        const allUsers = await User.find().select('_id name');
        let userFriends = [];
        for (let i = 0; i < inputUserFriendsId.length; ++i) {
            for (let j = 0; j < allUsers.length; ++j) {
                if (String(inputUserFriendsId[i]) === String(allUsers[j]._id)) {
                    userFriends.push(allUsers[j]);
                }
            }
        }
    res.status(200).json(userFriends);
    } catch(err) {
        console.warn(err);
        next(err);
    }
});

router.get('/:friendId', (req, res, next) => {
    const id = req.params.friendId;
    Friend.findById(id)
    .exec()
    .then(doc => {
        console.log('From db: ' + doc);
        if (doc) {
            const response = {
                userId: doc.userId,
                isFriendWith: doc._id,
                friendInfo: {
                    type: 'GET',
                    url: 'http://localhost:8080' + `/user-api/users/${doc._id}`
                }
            };
            res.status(200).json(response);
        } else {
            res.status(404).json({
                message : 'not found :('
            });
        }
    })
    .catch()
});

router.post('/', async(req, res, next) => {
    const userList = await User.find();
    const userListId = userList.map(user => user._id);
    const userIdParam = req.body.userId;
    const friendIdParam = req.body._id;

    console.log(userListId);
    if (userListId.includes(userIdParam)) {
        res.status(404).json({
            message : 'User does not exist'
        });
    } else {
        if (userListId.includes(friendIdParam)) {
            res.status(404).json({
                message : 'No such friend exists',
                tip : 'Maybe your friend is not a user yet'
            });
        } else {
            try {
                console.log(`Can create friendship between ${userIdParam} and ${friendIdParam}`);
                const dbFriend = new Friend({
                    _id: friendIdParam,
                    userId: userIdParam
                });
                dbFriend.save();
                res.status(201).json({
                    message: 'Created friendship',
                    friend: dbFriend
                });
            } catch(err) {
                console.warn(err);
                res.status(500).json({
                    error : err
                });
            }
        }
    }
});

module.exports = router;