const Item = require('../models/item');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    res.send('not implemented: site home page');
});

exports.item_list = asyncHandler(async (req, res, next) => {
    res.send('not implemented: item list');
});

exports.item_detail = asyncHandler(async (req, res, next) => {
    res.send(`not implemented: item detail: ${req.params.id}`);
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
    res.send('not implemented: item create get');
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
    res.send('not implemented: item create post');
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
    res.send('not implemented: item update get');
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
    res.send('not implemented: item update post');
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
    res.send('not implemented: item delete get');
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
    res.send('not implemented: item delete post');
});