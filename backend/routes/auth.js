
const express = require('express')
const { Mongoose } = require('mongoose')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const brcypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'Shivamverifiedit';
//Route 1 : create a user using POST : '/api/auth/createUser' doesnt require auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 3 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        //check if the email id provided already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            let success = false;
            return res.status(400).json({ success, error: 'Sorry, a user with this email already exists' })
        }
        const salt = await brcypt.genSalt(10)
        secPass = await brcypt.hash(req.body.password, salt)
        //create a new user if email id is unique
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        let success = true;
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server error occured')
    }
})


//Route 2: Authenticate a user using /auth/login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Please try to login with correct credential' });
            }

            const pwdComapre = await brcypt.compare(password, user.password);
            if (!pwdComapre) {
                let success = false;
                return res.status(400).json({ success, error: 'Please try to login with correct credential' });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            let success = true;
            res.json({ success, authToken })
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server error occured')
        }
    })

//Route 3 : Get logged in user details using POST. login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server error occured')
    }
})

module.exports = router