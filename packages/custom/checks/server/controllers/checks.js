'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Check = mongoose.model('Check');

/**
 * Create Check
 */
exports.create = function(req, res, next) {

    req.assert('username', 'You must enter a valid username').notEmpty();
    req.assert('type', 'You must enter a valid check type in/out').isIn(['in', 'out']);

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    var User = mongoose.model('User');

    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            return res.status(500).send('Please Try Again');
        }
        if (!user) {
            return res.status(404).send('Invalid Username');
        }

        var check = new Check(req.body),
            inverseType = {
                'in': 'Out',
                'out': 'In'
            },
            tryAgainMsg = 'Try Again ' + user.name.split(' ')[0],
            tryCheckingInverse = 'First Try Checking ' + inverseType[check.type];

        check.user = user._id.toString();

        var saveSendCheck = function(err) {
            if (err) {
                return res.status(err.status).send(err.message);
            }
            check.save(function(err) {
                if (err) {
                    return res.status(409).send(tryAgainMsg);
                }
                check._doc.user = {
                    _id: user._id,
                    name: user.name
                };
                res.jsonp(check);
            });
        };

        mongoose.model('Check').findOne({
                user: user._id.toString()
            })
            .sort('-created')
            .limit(1)
            .exec(function(err, _check) {
                if (err) {
                    err.status = 409;
                    err.message = tryAgainMsg;
                } else if (!_check) {
                    if (check.type === 'out') {
                    err = {};
                    err.status = 409;
                    err.message = tryCheckingInverse;
                    }
                } else if(check.type === _check.type) {
                    err = {};
                    err.status = 409;
                    err.message = tryCheckingInverse;
                }

                saveSendCheck(err);
            });
    });
};

/**
 * List of Users
 */
exports.all = function(req, res) {
    Check.find(req.query).sort('-created')
        .populate('user', 'name username')
        .exec(function(err, checks) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(checks);
            }
        });
};
