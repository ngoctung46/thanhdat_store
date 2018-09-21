const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');
const Product = require('../models/product.model');
router.get('/', function (req, res, next) {
  Category.find(function (err, items) {
        if (err) return next (err);
        res.json(items);
    })
});

router.get('/:id', function (req, res, next) {
  Category.findOne({ _id : req.params.id}, function (err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

router.get('/:id/products', function(req, res, next) {
  Product.find({category_id: req.params.id}, function (err, items) {
    if (err) return next(err);
    res.json(items);
  });
});

router.post('/', function(req, res, next) {
  Category.create(req.body, function (err, item) {
        if (err) return next (err);
        res.json(item);
    });
});

router.put('/:id', function(req, res, next) {
  Category.findOneAndUpdate({ _id : req.params.id}, req.body, function (err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

router.delete('/:id', function(req, res, next) {
  Category.findOneAndRemove({ _id : req.params.id}, function (err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

module.exports = router;
