const db = require("../routes/db-config");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
    const { name, email, password, password2, date } = req.body;
    try {
        // Validate form fields
        if (!name || !email || !password || !password2 || !date) {
            req.flash('error', 'All fields are required');
            return res.redirect('/register');
        }else if (password !== password2) {
            req.flash('error', 'Password do not match!');
            return res.redirect('/register');
        }
         else {
            console.log(email);
            // Check if email already exists in the database
            db.query('SELECT email FROM registration WHERE email = ?', [email], async (err, result) => {
                if (err) {
                    throw err; // Handle database query error
                } else {
                    if (result.length > 0) {
                        req.flash('error', 'Email address already exists');
                        return res.redirect('/register')
                    } else {
                        // Add user to the database
                        const hashedPassword = await bcrypt.hash(password, 8);
                        console.log(hashedPassword);
                        // Add user to the database
                        db.query('INSERT INTO registration SET ?', { name: name, email: email, password: hashedPassword, JoinDate: date }, (error, results) => {
                            if (error) {
                                throw error; // Handle database insertion error
                            }
                            req.flash('success', 'User has been registered');
                            return res.redirect('/login');
                        });
                    }
                }
            });
        }
        // If the registration is successful, redirect the user to the login page
        // res.redirect('/login');

    } catch (error) {
        console.error("Error during registration:", error);
        req.flash('error', error.message);
        res.redirect('/register'); // Render registration form with error message
    }
}

module.exports = register;
