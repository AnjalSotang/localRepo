// Increase the limit of listeners for EventEmitters
require('events').EventEmitter.defaultMaxListeners = 15; // Set the limit to an appropriate value

const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const db = require("./routes/db-config");
const router = require("./routes/pages"); 
const authController = require('./controllers/auth');
const dotenv = require('dotenv').config();
const multer = require('multer');
//
// const exp = require('express-handlebars')
// const fileUpload =  require("express-fileupload");
const app = express();

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Use environment variable or default secret
    resave: false,
    saveUninitialized: false
}));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies
app.use(bodyParser.json());

// Use cookie parser
app.use(cookieParser());

// Use flash messages
app.use(flash());

// Serve static files from the './public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'public/styles'), { type: 'text/css' }));

//defult option
// app.use(fileUpload());

// Set the 'views' directory for EJS files
app.set('views', path.join(__dirname, 'views'));
// app.engine('ejs', exp({ extname: '.ejs' }));
app.set('view engine', 'ejs');

// Routes
app.use("/", router);
app.use('/auth', authController);
app.use(cors());


app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//Checking database connectivity
db.connect(function (error) {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
        process.exit(1); // Exit the process if database connection fails
    }
    console.log('Connected to MySQL database!');
});

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer upload middleware
const upload = multer({ storage: storage });

// Route to handle profile picture upload
app.post('/update-profile-pic', upload.single('profilePic'), (req, res) => {
    // Access uploaded file details
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    // Process the uploaded file (save to database, etc.)
    // Example: Update user profile with the file path
    const filePath = file.path;
    UpdateUserProfile(req.user.id, { profilePic: filePath })
        .then(() => {
            res.redirect("/user");
        })
        .catch((err) => {
            console.error("Error updating profile:", err);
            res.status(500).send("Internal Server Error");
        });
});

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log (`Server is running on port ${PORT}`);
});
