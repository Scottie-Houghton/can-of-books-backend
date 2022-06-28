'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Book = require('./models/books.js');

async function seed() {
  await Book.create({
    title: 'Sharp Objects',
    description: 'Sharp Objects revolves around the life of journalist Camille Preaker, who returns to her hometown, Wind Gap, Missouri, to cover the death of two girls. Initially, Camille does not want to go back to her hometown, but she eventually agrees to make her boss happy.',
    read: false
  });
  console.log('Sharp Objects was added');

  await Book.create({
    title: 'Shrill: Notes From a Loud Woman',
    description: 'Shrill, is an uproarious memoir, a feminist rallying cry in a world that thinks gender politics are tedious and that women, especially feminists, can\'t be funny.',
    read: true
  });
  console.log('Shrill was added');

  await Book.create({
    title: 'The Chestnut Man',
    description: 'A psychopath is terrorizing Copenhagen. His calling card is a “chestnut man”—a handmade doll made of matchsticks and two chestnuts—which he leaves at each bloody crime scene. Examining the dolls, forensics makes a shocking discovery—a finger. If you find one, he’s already found you.',
    read: false
  });
  console.log('The Chestnut Man was added');
  mongoose.disconnect();
}

seed();
