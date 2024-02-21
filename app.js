const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// Set the view engine to EJS for rendering HTML from templates
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Serve static files (like CSS, JavaScript, and images) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON payloads (for APIs and AJAX calls)
app.use(express.json());

// Parse URL-encoded payloads (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Define routes for different parts of the application
const pagesRoute = require('./routes/pages');
const apiRoute = require('./routes/api');

// Mount the routes to the application
app.use('/', pagesRoute);
app.use('/api', apiRoute);

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
