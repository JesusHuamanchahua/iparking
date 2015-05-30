'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */

var CheckSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: [
            'in',
            'out'
        ]}
});


/**
 * Pre-save hook
 */
CheckSchema.pre('save', function(next) {
    next();
});

CheckSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
});

mongoose.model('Check', CheckSchema);