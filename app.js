const path = require('path')
const express = require('express');
const app =  express();
const dotenv = require('dotenv')
const db = require('./config/db');
const category = require('./routes/category.routes')
const bodyParser = require('body-parser');

// dot env config
dotenv.config()

app.use(express.json()) // parsign the  json data
app.use(express.urlencoded({ extended: true })); // we can parse form data here
app.use(express.static('public'));
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page'});
});

app.get('/admin', (req, res) => {
    res.render('dashboard', { title: 'admin Panel'});
});

app.get('/posts', (req, res) => {
    res.render('posts', { title: 'Posts'});
});
// cateogry routes
app.use('/api/category',category);



// app.post('/posts/create', (req, res) => {
//
//     res.send({response:'working on it'})
//     //res.render('posts', { title: 'Posts'});
// });



app.listen(process.env.PORT,()=>{
  console.log(`The application is running at http://localhost:${process.env.PORT}`)
})
