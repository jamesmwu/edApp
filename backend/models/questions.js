const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
    values: {
        type: [String],
        required: true
    }
});

const QuestionSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: false
    },
    options: {
        type: Schema.Types.Mixed,
        required: false,
        validate: {
            validator: function (options) {
                if (Array.isArray(options)) {
                    // Single array
                    return true;
                } else if (typeof options === 'object' && Object.values(options).every(Array.isArray)) {
                    // Object with multiple arrays
                    return true;
                } else {
                    return false;
                }
            },
            message: props => `${props.path} must be either a single array or an object with multiple arrays`
        }
    },
    correct_option: {
        type: Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function (correctOption) {
                if (typeof correctOption === 'string' || typeof correctOption === 'object') {
                    return true;
                } else {
                    return false;
                }
            },
            message: props => `${props.path} must be a string or an object`
        }
    }
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
