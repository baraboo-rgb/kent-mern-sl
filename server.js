const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Unsure where to put this...but this fixes the postman get sending a 404 error
app.use("/api/items", items);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
    app.use(bodyParser.json());

// Serve Static Assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;
    
app.listen(port, () => console.log(`Server started on port ${port}`));