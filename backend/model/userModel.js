const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: 10
    },
    image: {
        type: String,
        default: process.env.DEFAULT_IMAGE
    },
    address: {
        type: Object,
        default: {
            line1: '',
            line2: ''
        }
    },
    gender: {
        type: String,
        default: "Not selected"
    },
    dob: {
        type: String,
        default: "Not selected"
    },
    phone: {
        type: String,
        default: "0000000000"
    }
});

userSchema.methods.toJSON = () => {
    const user = this.castObject();
    delete user.password;
    return user;
}

const User = mongoose.models.users || mongoose.model('Users', userSchema);

module.exports = User;