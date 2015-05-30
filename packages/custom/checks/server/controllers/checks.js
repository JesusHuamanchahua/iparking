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
    req.assert('type', 'You must enter a valid check type in7out').isIn(['in', 'out']);

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    var User = mongoose.model('User');

    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            return res.status(500).jsonp(err);
        }
        if (!user) {
            return res.status(404).jsonp({
                message: 'User not found'
            });
        }

        var check = new Check(req.body);

        check.user = user._id.toString();

        var saveSendCheck = function(err) {
            if (err) {
                err.user = user;
                return res.status(500).jsonp(err);
            }
            check.save(function(err) {
                if (err) {

                    err.user = user;
                    err.message = 'Check type must be different than previous';

                    return res.status(500).jsonp(err);
                }
                Check.populate(check, {
                    path: 'user',
                    model: 'User'
                }, function(err, _check) {
                    res.jsonp(_check || check);
                });
            });
        };

        mongoose.model('Check').findOne({
                user: user._id.toString()
            })
            .sort('-created')
            .limit(1)
            .exec(function(err, _check) {
                if (!err && !_check) {
                    if (check.type === 'out') {
                        err = {
                            message: 'Check in must precede checking out'
                        };
                    } else {
                        return saveSendCheck();
                    }
                } else if (check.type === _check.type) {
                    err = {
                        message: 'Check type must be different than previous'
                    };
                }
                saveSendCheck(err);
            });
    });
};

/**
 * Find user by id
 */
// exports.user = function(req, res, next, id) {
//     User
//         .findOne({
//             _id: id
//         })
//         .exec(function(err, user) {
//             if (err) return next(err);
//             if (!user) return next(new Error('Failed to load User ' + id));
//             req.profile = user;
//             next();
//         });
// };
/**
 * Update a user
 */
// exports.update = function(req, res) {
//     var user = req.profile;
//     user = _.extend(user, req.body);

//     user.save(function(err) {
//         res.jsonp(user);
//     });
// };

/**
 * Delete an user
 */
// exports.destroy = function(req, res) {
//     var user = req.profile;

//     user.remove(function(err) {
//         if (err) {
//             res.render('error', {
//                 status: 500
//             });
//         } else {
//             res.jsonp(user);
//         }
//     });
// };

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