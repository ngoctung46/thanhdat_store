const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.get('/', function (req, res, next) {
  Product.find(function (err, items) {
        if (err) return next (err);
        res.json(items);
    })
});

router.get('/:id', function (req, res, next) {
  Product.findOne({ _id : req.params.id}, function (err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

router.post('/', function(req, res, next) {
  Product.create(req.body, function (err, item) {
        if (err) return next (err);
        res.json(item);
    });
});

router.put('/:id', function(req, res, next) {
  Product.findOneAndUpdate(req.params.id, req.body, function (err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

router.delete('/:id', function(req, res, next) {
  Product.findOneAndRemove(req. params.id, function (err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

module.exports = router;
