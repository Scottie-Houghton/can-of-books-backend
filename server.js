'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const Book = require('./models/books.js');
const { response } = require('express');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);
app.put('/books/:id', putBooks);

async function getBooks(request, response, next) {
  try {
    let results = await Book.find();
    response.status(200).send(results);
  } catch(error) {
    next(error);
  }
}

async function postBooks(request, response, next) {
  console.log(request.body);
  try {
    let createdBook = await Book.create(request.body);
    response.status(200).send(createdBook);
  } catch(error) {
    next(error);
  }
}

async function deleteBooks(request, response, next) {
  let id = request.params.id;
  console.log(id);
  try {
    await Book.findByIdAndDelete(id);
    response.status(200).send('Book deleted');
  } catch(error) {
    next(error);
  }
}

async function putBooks(request, response, next) {
  let id = request.params.id;
  try {
    let data = request.body;
    let updatedBook = await Book.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    response.status(200).send(updatedBook);
  } catch(error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});


app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
