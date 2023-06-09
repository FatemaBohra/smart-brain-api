const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profileGet = require('./controllers/profileGet');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: 'postgres://fatemabohra:RPwxjVUoNV9GLxqa8YYIe62aRJqZOqzk@dpg-ci1n1g1mbg56bei96cqg-a/smart_brain_db_qy16',
        user: 'fatemabohra',
        password: '',
        database: 'smart_brain_db_qy16'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('success'); })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profileGet.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});