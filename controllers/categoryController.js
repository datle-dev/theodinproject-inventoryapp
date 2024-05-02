const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({})
  .sort({ name: 1 })
  .exec();

  res.render('pages/categoryList', {
    title: 'Category List',
    category_list: categories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();

    res.render('pages/categoryDetail', {
      title: 'Category Detail',
      category: category,
    });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send('not implemented: category create get');
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send('not implemented: category create post');
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send('not implemented: category update get');
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send('not implemented: category update post');
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send('not implemented: category delete get');
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send('not implemented: category delete post');
});