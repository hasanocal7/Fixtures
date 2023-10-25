const { User } = require('../models');

exports.createUser = async (req, res) => {
    try {
        if (req.body.password == req.body.c_password){
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
        })
        } else {
            res.status(400).send('Passwords are not matched')
        } 
        res.status(201).json(user)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = req.body
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error)
    }
}