const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

mongoose
    .connect(
        'mongodb+srv://jameswu21:Wames21@app.tdz0amb.mongodb.net/data',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log('Connected to DB'))
    .catch(console.error);

app.listen(3001, () => console.log('Server listening on port 3001'));

const User = require('./models/users');
const Question = require('./models/questions');

//Users endpoints
app.get('/users', async (req, res) => {
    const users = await User.find();

    res.json(users);
});

app.get('/users/:_id', async (req, res) => {
    const users = await User.findById(req.params._id);

    res.json(users);
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        res.status(401).json({ error: "That username doesn't exist" });
        return;
    }
    if (
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                // res.json(user);
                const token = jwt.sign({ userId: user._id }, 'secret_key');
                res.json({ token, user });
            } else {
                res.json({ error: 'Incorrect password' });
            }
        })
    );
});

app.post('/users/new', async (req, res) => {
    const dupUser = await User.findOne({ username: req.body.username });
    if (dupUser) {
        res.json({ error: 'Duplicate username exists.' });
        return;
    }
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        streak: 0,
        score: 0,
    });

    await user.save();

    res.json(user);
});

app.delete('/users/delete/:_id', async (req, res) => {
    const result = await User.findByIdAndDelete(req.params._id);

    res.json(result);
});

app.put('/users/edit/:_id', async (req, res) => {
    const user = await User.findById(req.params._id);

    user.username = req.body.username;
    user.password = req.body.password;
    user.name = req.body.name;
    user.save();

    res.json(user);
});

app.put('/users/updateScore/:_id', async (req, res) => {
    const user = await User.findById(req.params._id);

    user.score += req.body.incrementScore;
    user.save();

    res.json(user);
});



//Questions endpoints
app.get('/questions', async (req, res) => {
    const questions = await Question.find();

    res.json(questions);
});

app.get('/questions/:_id', async (req, res) => {
    const questions = await Question.findById(req.params._id);

    res.json(questions);
});

app.post('/questions/new', async (req, res) => {
    const question = new Question({
        type: req.body.type,
        question: req.body.question,
        options: req.body.options,
        correct_option: req.body.correct_option
    });

    await question.save();

    res.json(question);
});

app.delete('/questions/delete/:_id', async (req, res) => {
    const result = await Question.findByIdAndDelete(req.params._id);

    res.json(result);
});

app.put('/questions/edit/:_id', async (req, res) => {
    const question = await Question.findById(req.params._id);

    question.type = req.body.type;
    question.question = req.body.question;
    question.options = req.body.options;
    question.correct_option = req.body.correct_option;

    await question.save();

    res.json(question);
});
