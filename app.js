const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// ROUTES
app.use('/', require('./routes/pageRoute'));

// SERVER CONNECTION
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is connected Port: ${port}`);
});
