const express = require('express');
const app = express();
const port = 3000;
const host = 'localhost';

const { writeJSON, readJSON } = require('./utils.js');

const  listRouter  = require('./routers/posts.js');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<h1>Benvenuto nel mio blog</h1>`);
});



app.use('/posts', express.urlencoded({extended:true}) , listRouter);

// app.post('/posts', (req, res) => {
//   const posts = readJSON('posts');
//   writeJSON('posts', [...posts, req.body]);
//   res.send('Post effettuato correttamente');
// });

app.listen(port, host, () => {
  console.log(`Server avviato su http://${host}:${port}`);
});
