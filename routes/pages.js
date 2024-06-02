const express = require("express");
const router = express.Router();
const logout = require('../controllers/logout'); 
const db = require("./db-config");
const jwt = require("jsonwebtoken")

router.get('/', (req, res) => {
    res.render("landingPage.ejs");
});

router.get('/index', (req, res) => {
    res.render("index");
});

router.get('/register', (req, res) => {
    res.render('register', { messages: req.flash() }); // Assuming register.ejs is in the views directory
});

router.get('/login', (req, res) => {
    res.render('login.ejs', { messages: req.flash() });
});

// Example route for handling logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/login'); // Redirect to login page after logout
    });
});

router.get('/about', (req, res) => {
    res.render('about.ejs', { messages: req.flash() });
});


router.get('/feedback', (req, res) => {
    res.render('feedback.ejs', { messages: req.flash() });
});

router.get('/program', (req, res) => {
    res.render('program.ejs', { messages: req.flash() });
});

router.get('/four', (req, res) => {
    res.render('four.ejs', { messages: req.flash() });
});

router.get('/chest', (req, res) => {
    res.render('chest.ejs', { messages: req.flash() });
});


router.get('/back', (req, res) => {
    res.render('back.ejs', { messages: req.flash() });
});

router.get('/leg', (req, res) => {
    res.render('leg.ejs', { messages: req.flash() });
});

router.get('/arm', (req, res) => {
    res.render('arm.ejs', { messages: req.flash() });
});

router.get('/five', (req, res) => {
    res.render('five.ejs', { messages: req.flash() });
});

router.get('/cs', (req, res) => {
    res.render('cs.ejs', { messages: req.flash() });
});

router.get('/shoulder', (req, res) => {
    res.render('shoulder.ejs', { messages: req.flash() });
});

router.get('/six', (req, res) => {
    res.render('six.ejs', { messages: req.flash() });
});

router.get('/db', (req, res) => {
    res.render('db.ejs', { messages: req.flash() });
});

router.get('/12', (req, res) => {
    res.render('12.ejs', { messages: req.flash() });
});

router.get('/super', (req, res) => {
    res.render('super.ejs', { messages: req.flash() });
});







//read
router.get('/data', (req, res) => {
    db.query("SELECT * FROM feedback", (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.render("read.ejs", { rows }); // Pass rows as an object
        }
    });
});

router.get('/user', async (req, res) => {
    try {
        // Extract user information from JWT token
        const token = req.cookies.userSave;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const loggedInUserId = decoded.id;

        // Query the database to retrieve user-specific data
        db.query('SELECT * FROM registration WHERE id = ?', [loggedInUserId], (err, userData) => {
            if (err) {
                console.error("Error retrieving user data:", err);
                // Handle database query errors
                res.status(500).send("Internal Server Error");
                return;
            }

            if (userData.length === 0) {
                // If no user data found for the provided ID
                console.error("No user found with ID:", loggedInUserId);
                res.status(404).send("User not found");
                return;
            }
            
            // Render the user.ejs template with user data
            res.render("user.ejs", { user: userData[0] }); 
        });
    } catch (error) {
        console.error("Error retrieving user data:", error);
        // Handle errors (e.g., token expired, invalid token, etc.)
        res.status(401).send("Unauthorized");
    }
});

router.get("/delete-data/:id", (req, res) => {
    const deleteData = "DELETE FROM registration WHERE ID=?";
    db.query(deleteData, [req.params.id], (err, result) => {
        if (err) {
            console.error("Error deleting data:", err);
            // Handle the error more gracefully, for example:
            // res.render("error", { message: "Error deleting data", error: err });
            res.redirect("/data"); // Redirect to the data page even on error
        } else {
            if (result.affectedRows > 0) {
                console.log("Data deleted successfully");
            } else {
                console.log("No data deleted");
            }
            res.redirect("/register"); // Redirect to the data page after deletion
        }
    });
});

router.get("/update-userData/:ID", (req, res) => {
    db.query("SELECT * FROM registration WHERE ID = ?", [req.params.ID], (err, userData) => {
        if (err) {
            console.error("Error retrieving user data:", err);
            // Handle database query errors
            res.status(500).send("Internal Server Error");
            return;
        }

        if (userData.length === 0) {
            // If no user data found for the provided ID
            console.error("No user found with ID:", req.params.ID);
            res.status(404).send("User not found");
            return;
        }

        // Render the update.ejs template with user data
        const user = userData[0]; 
        console.log(user)// Extract user data from the result
        res.render("update.ejs", { user });
    });
});

// router.get("/update-data/:id", (req, res) => {
//     db.query("SELECT * FROM feedback WHERE id = ?", [req.params.id], (err, eachRow) => {
//         if (err) {
//             console.log(err);
//         } else {
//             result = JSON.parse(JSON.stringify(eachRow[0])); 
//             console.log(result);
//             res.render("edit.ejs", result);
//         }
//     });
// });

// router.get("/update-data/:id", (req, res) => {
//     db.query("SELECT * FROM feedback WHERE id = ?", [req.params.id], (err, eachRow) => {
//         if (err) {
//             console.log(err);
//         } else {
//             result = JSON.parse(JSON.stringify(eachRow[0])); 
//             console.log(result);
//             res.render("edit.ejs", result);
//         }
//     });
// });









module.exports = router;
