const express = require('express');
const router = express.Router();
const Store = require('../models/store.model');

router.get('/', function (req, res, next) {
    Store.find(function (err, items) {
        if (err) return next (err);
        res.json(items);
    })
});

router.get('/:id', function (req, res, next) {
    Store.findOne({ _id : req.params.id}, function (err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

router.post('/', function(req, res, next) {
    Store.create(req.body, function (err, item) {
        if (err) return next (err);
        res.json(item);
    });
});

router.put('/:id', function(req, res, next) {
    Store.findOneAndUpdate({ _id : req.params.id }, req.body, function (err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

router.delete('/:id', function(req, res, next) {
    Store.findOneAndRemove({ _id : req.params.id}, function (err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

module.exports = router;
