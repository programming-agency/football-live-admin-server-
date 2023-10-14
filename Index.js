const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 5000; // You can change this port as needed

// middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://127.0.0.1:27017/FootballLive', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('✅✅Connected to MongoDB');
});

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, Football Live!');
});


// Post method
app.post('/api/items', (req, res) => {

    const Item = mongoose.model('Item', { name: String });

    const newItem = new Item({ name: req.body.name });

    newItem.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving item');
        } else {
            res.status(201).send('Item saved');
        }
    });
});


// Get method
app.get('/api/items', (req, res) => {

    const Item = mongoose.model('Item', { name: String });

    Item.find({}, (err, items) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching items');
        } else {
            res.json(items);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`🚀🚀Server is running on port ${port}`);
});
