const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swag_controller');
const authController = require('./controllers/auth_controller');
const cartController = require('./controllers/cart_controller');
const searchController = require('./controllers/search_controller');
require('dotenv').config();

app.use(bodyParser.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60 * 60 * 1000 * 24 * 14
        }
    })
)
app.use(checkForSession);
app.use( express.static( `${__dirname}/../build` ) );

app.get('/api/swag', swagController.read)

app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)

app.post('/api/cart', cartController.add)
app.post('/api/cart/checkout', cartController.checkout)
app.delete('/api/cart', cartController.delete)

app.get('/api/search', searchController.search)

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})