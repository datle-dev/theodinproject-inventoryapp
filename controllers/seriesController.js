const Series = require('../models/series');
const asyncHandler = require('express-async-handler');

exports.series_list = asyncHandler(async (req, res, next) => {
  const series = await Series.find({})
    .sort({ name: 1 })
    .exec();

  res.render('pages/seriesList', {
    title: 'Series List',
    series_list: series,
  });
});

exports.series_detail = asyncHandler(async (req, res, next) => {
    const series = await Series.findById(req.params.id).exec();

    res.render('pages/seriesDetail', {
      title: 'Series Detail',
      series: series,
    });
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