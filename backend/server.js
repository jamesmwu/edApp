const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

mongoose
	.connect('mongodb+srv://{URI}', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Connected to DB'))
	.catch(console.error);

app.listen(3001, () => console.log('Server listening on port 3001'));

const User = require('./models/users');
const Question = require('./models/questions');
const Unit = require('./models/units');

//Users endpoints
//Gets all users
app.get('/users', async (req, res) => {
	const users = await User.find();

	res.json(users);
});

//Gets users by ID
app.get('/users/:_id', async (req, res) => {
	const users = await User.findById(req.params._id);

	res.json(users);
});

//Logs users in by username and password
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

//Creates new user
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
		score: 0
	});

	await user.save();

	res.json(user);
});

//Deletes user by ID
app.delete('/users/delete/:_id', async (req, res) => {
	const result = await User.findByIdAndDelete(req.params._id);

	res.json(result);
});

//Edits user by ID
app.put('/users/edit/:_id', async (req, res) => {
	const user = await User.findById(req.params._id);

	user.username = req.body.username;
	user.password = req.body.password;
	user.name = req.body.name;
	user.save();

	res.json(user);
});

//Updates score by ID
app.put('/users/updateScore/:_id', async (req, res) => {
	const user = await User.findById(req.params._id);

	user.score += req.body.incrementScore;
	user.save();

	res.json(user);
});

//Questions endpoints
//Gets all questions
app.get('/questions', async (req, res) => {
	const questions = await Question.find();

	res.json(questions);
});

//Gets questions by ID
app.get('/questions/:_id', async (req, res) => {
	const questions = await Question.findById(req.params._id);

	res.json(questions);
});

//Gets questions by unit and lesson
app.get('/questions/:unit/:stage', async (req, res) => {
	const questions = await Question.find({
		unit: req.params.unit,
		lesson: req.params.stage
	});

	res.json(questions);
});

//Creates new question
app.post('/questions/new', async (req, res) => {
	const question = new Question({
		type: req.body.type,
		question: req.body.question,
		questionImg: req.body.questionImg,
		options: req.body.options,
		correct_option: req.body.correct_option,
		unit: req.body.unit,
		lesson: req.body.lesson,
		explanation: req.body.explanation
	});

	await question.save();

	res.json(question);
});

//Deletes question by ID
app.delete('/questions/delete/:_id', async (req, res) => {
	const result = await Question.findByIdAndDelete(req.params._id);

	res.json(result);
});

//Edits question by ID
app.put('/questions/edit/:_id', async (req, res) => {
	const question = await Question.findById(req.params._id);

	question.type = req.body.type;
	question.question = req.body.question;
	question.options = req.body.options;
	question.correct_option = req.body.correct_option;

	await question.save();

	res.json(question);
});

//Updates schema with new "unit" field (internal use)
app.put('/questions/addUnit', async (req, res) => {
	const question = await Question.updateMany(
		{},
		{ $set: { unit: req.body.unit } }
	);

	res.json(question);
});

//Updates schema with new "lesson" field (internal use)
app.put('/questions/addLesson', async (req, res) => {
	const question = await Question.updateMany(
		{},
		{ $set: { lesson: req.body.lesson } }
	);

	res.json(question);
});

//Units endpoints
// Create a new unit
app.post('/units/new', async (req, res) => {
	const unit = new Unit({
		title: req.body.title,
		lessons: req.body.lessons,
		stage: req.body.stage
	});

	await unit.save();

	res.json(unit);
});

// Get all units
app.get('/units', async (req, res) => {
	const units = await Unit.find();

	res.json(units);
});

// Get a unit by ID
app.get('/units/:_id', async (req, res) => {
	const unit = await Unit.findById(req.params._id);

	res.json(unit);
});

// Update a unit by ID
app.put('/units/edit/:_id', async (req, res) => {
	const unit = await Unit.findByIdAndUpdate(
		req.params._id,
		{
			title: req.body.title,
			lessons: req.body.lessons
		},
		{ new: true }
	);

	res.json(unit);
});

// Delete a unit by ID
app.delete('/units/delete/:_id', async (req, res) => {
	const result = await Unit.findByIdAndDelete(req.params._id);

	res.json(result);
});
