const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcrypt");
// const flash = require('express-flash');

const fetchUser = async (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, password FROM registration WHERE email = ?', [email], (err, data) => {
            if (err)
                reject(err)
            else {
                resolve(data)
            }
        })
    })
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            req.flash('error', 'Please provide an email and password');
            return res.redirect('/login');
        }

        // Query the database to find user with provided email
        // const user = await db.query('SELECT id, password FROM registration WHERE email = ?', [email]);
        // console.log(user)
        const data = await fetchUser(email)
        console.log(data)

        if (data.length === 0) {
            console.log('incorrect')
            req.flash('error', 'Invalid email or password');

            return res.status(401).redirect('/login')
        }

        // console.log('Query Result:', typeof(user['result']))

        // Check if user with provided email exists

        // Check if password matches
        const passwordMatch = await bcrypt.compare(password, data[0].password);
        if (!passwordMatch) {
            req.flash('error', 'Email or password is incorrect');
            return res.status(401).redirect('/login');
        }

        // Generate JWT token for authentication with user information
        const token = jwt.sign({ id: data[0].id, email: email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        });

        // Set cookie with JWT token
        const cookieOptions = {
            expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        res.cookie('userSave', token, cookieOptions);

        // Redirect user to home page
        return res.status(200).redirect("/index");

    } catch (error) {
        // Handle errors
        console.error("Error during login:", error);
        req.flash('error', 'Internal Server Error');
        return res.status(500).redirect('/login');
    }
};

module.exports = login;
