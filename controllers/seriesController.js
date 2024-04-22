const Series = require('../models/series');
const asyncHandler = require('express-async-handler');

exports.series_list = asyncHandler(async (req, res, next) => {
    res.send('not implemented: series list');
});

exports.series_detail = asyncHandler(async (req, res, next) => {
    res.send(`not implemented: series detail: ${req.params.id}`);
});

exports.series_create_get = asyncHandler(async (req, res, next) => {
    res.send('not implemented: series create get');
});

exports.series_create_post = asyncHandler(async (req, res, next) => {
    res.send('not implemented: series create post');
});

exports.series_update_get = asyncHandler(async (req, res, next) => {
    res.send('not implemented: series update get');
});

exports.series_update_post = asyncHandler(async (req, res, next) => {
    res.send('not implemented: series update post');
});

exports.series_delete_get = asyncHandler(async (req, res, next) => {
    res.send('not implemented: series delete get');
});

exports.series_delete_post = asyncHandler(async (req, res, next) => {
    res.send('not implemented: series delete post');
});