// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
//  Serve static files
app.use(express.static('public'));
// Connect to mongoDB database
const mongoURL = 'mongodb://localhost:27017/IPSDB';
mongoose.connect(mongoURL, { useNewUrlParser: true });
// Routing
// Configure port
const port = 8080;
// Listen to port
app.listen(port);
console.log(`Server is running on port: ${port}`);

// Routing
router.get('/', (request, response) => {
    response.status(200).send({message: 'Hello World!'})
});
//Set app to use express backend router
app.use(router);