const UserModel = require('../models/User');
const { genSalt, hash, compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
};


//regiser successful
const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        const hashedConfirmPassword = await hash(confirmPassword, salt);

        if (!username) {
            return res.json({
                error: 'username is required',
            });
        }

        if (!password || password.length < 5) {
            return res.json({
                error: 'password is required and should be at least 6 characters long',
            });
        }

        if (confirmPassword !== password) {
            return res.json({
                error: 'enter the same password',
            });
        }

        const exists = await UserModel.findOne({ email });
        if (exists) {
            return res.json({
                error: 'Email is taken already',
            });
        }
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
        });
        console.log('register successfully');
        return res.json({ user });
    } catch (err) {
        console.log("can't register", err);
        return res.json({ message: err.message });
    }
};

//login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        // if (!user) {
        //     return res.json({
        //         error: 'no user found',
        //     });
        // }

        //check if pass matches
        const validPassword = await compare(password, user.password);
        if (validPassword) {
            jwt.sign(
                { email: user.email, id: user._id, username: user.username },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token)
                    .json(user);
                }
            );
            console.log("login successful")
        } else {
            res.json({ error: "password doesn't match" });
        }
    } catch (error) {
        console.log(error);
    }
};

//profile endpoint
const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

//logout
const logoutUser = (req, res) => {
    req.logout();
    res.redirect('/login');
};




module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
};
