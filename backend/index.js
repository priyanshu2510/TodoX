const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
const connectDB = require('./db/mongoose');
const controller = require('./routes/controller.js');

app.use(express.static('../frontend'));
//database connection
connectDB();


//middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api', controller);
app.get('/todox', (req, res) => {
  var html = fs.readFileSync('../frontend/signin.html', 'utf8')
  res.send(html);
});


//port setup
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});