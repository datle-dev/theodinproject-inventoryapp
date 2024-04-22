const Series = require('../models/series');
const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler(async (req, res, next) => {
    res.send('not implemented: category list');
});

exports.category_detail = asyncHandler(async (req, res, next) => {
    res.send(`not implemented: category detail: ${req.params.id}`);
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