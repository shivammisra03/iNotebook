
const express = require('express')
const { Mongoose } = require('mongoose')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

//create a user using POST : '/api/auth/createUser' doesnt require auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 3 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //check if the email id provided already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'Sorry, a user with this email already exists' })
        }
        //create a new user if email id is unique
        user = await Userd.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some error occured')
    }




})


module.exports = router