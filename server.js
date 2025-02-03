const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/robomazeDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema for storing registration data
const registrationSchema = new mongoose.Schema({
    teamName: String,
    leaderName: String,
    leaderMobile: String,
    leaderEmail: String,
    member1: String,
    member2: String,
    member3: String,
    agreement: Boolean,
    updates: Boolean
});

const Registration = mongoose.model('Registration', registrationSchema);

// Routes
app.post('/register', async (req, res) => {
    try {
        const registration = new Registration(req.body);
        await registration.save();
        res.status(200).send('Registration Successful!');
    } catch (error) {
        res.status(500).send('Error saving data: ' + error.message);
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
