const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    streak: {
        type: Number,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    lastLoggedIn: {
        type: Date,
        default: null,
    }
});


UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    // Generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash password using salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override cleartext password with hashed password
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;