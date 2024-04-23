#! /usr/bin/env node

require('dotenv').config();

console.log(
  'This script clears all items, categories, and series from your database.',
);

const Item = require('./models/item');
const Category = require('./models/category');
const Series = require('./models/series');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await clearAll();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function seriesClear() {
  await Series.deleteMany({});
  console.log('Cleared series');
}

async function categoriesClear() {
  await Category.deleteMany({});
  console.log('Cleared categories');
}

async function itemsClear() {
  await Item.deleteMany({});
  console.log('Cleared items');
}

async function clearAll() {
  console.log('Clearing series, categories, and items');
  await Promise.all([
    seriesClear(),
    categoriesClear(),
    itemsClear(),
  ]);
}
