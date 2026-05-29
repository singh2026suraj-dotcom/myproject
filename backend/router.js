const path = require('path');
const fs = require('fs');
const express = require('express');
const AccData = require('./models/AccData');

let loggedInUser = null;
const router = express.Router();

const Upload = path.join(__dirname, 'Upload');
if (!fs.existsSync(Upload)) fs.mkdirSync(Upload);

router.get('/', (req, res) => {
    res.send('djkfghfdvdkfjvl');
});

router.put('/update', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!loggedInUser) {
            return res.send({ msg: 'please sign in first' });
        }

        const updated = await AccData.findOneAndUpdate(
            { email: loggedInUser.email },
            { name, email, password },
            { new: true }
        );

        if (!updated) {
            return res.send({ msg: 'user not found' });
        }

        loggedInUser = updated;
        res.send({
            msg: 'congrats your data updated successfully',
            data: updated,
        });
    } catch (error) {
        res.status(500).send({ msg: 'update failed', error: error.message });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await AccData.findOne({ email, password });

        if (user) {
            loggedInUser = user;
            res.send({
                msg: 'congrats you are logged in',
                data: user,
            });
        } else {
            res.send({
                msg: 'register first!',
            });
        }
    } catch (error) {
        res.status(500).send({ msg: 'signin failed', error: error.message });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await AccData.findOne({ email });

        if (existing) {
            res.send({
                msg: 'user already exists plz enter diff email',
            });
        } else {
            const user = await AccData.create({ name, email, password });
            res.send({
                msg: 'congrats user register successfully',
                data: user,
            });
        }
    } catch (error) {
        res.status(500).send({ msg: 'signup failed', error: error.message });
    }
});

module.exports = router;
