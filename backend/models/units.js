const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stage: {
        type: Number,
        required: true
    }
});

const UnitSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    lessons: [LessonSchema],
    stage: {
        type: Number,
        required: true
    }
});


const Unit = mongoose.model('Unit', UnitSchema);
module.exports = Unit;
