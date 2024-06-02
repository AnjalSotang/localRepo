const db = require("../routes/db-config");
const bcrypt = require("bcrypt");


const feedback = async (req, res) => {
    const { name, email, feed } = req.body;
    try {
        // Validate form fields
        if (!name || !email || !feed) {
            req.flash('error', 'All fields are required');
            return res.redirect('/feedback');
        } else {
            // Add user to the database
            db.query('INSERT INTO feedback SET ?', { name: name, email: email, feedback: feed}, (error, results) => {
                if (error) {
                    throw error; // Handle database insertion error
                }
                req.flash('success', 'Your Feedback has been submitted');
                return res.redirect('/feedback');
            });
        }
    } catch (error) {
        console.error("Error during providing feedback:", error);
        req.flash('error', error.message);
        res.redirect('/feedback'); // Render registration form with error message
    }
}



module.exports = feedback;
