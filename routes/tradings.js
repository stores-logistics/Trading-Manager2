var express = require('express');
var router = express.Router();

var Trading = require('../models/Trading');

router.get('/', function(req, res, next) {
    Trading.find(function(err, tradings){
    res.send(tradings);
  });
});

router.get('/:id', function(req,res,next){
    Trading.findById(req.params.id)
    .exec(function(err, trading){
        res.send(trading);
    });
});

router.get('/store/:store_id', function(req,res,next){
    Trading.find({store_id: req.params.store_id})
    .exec(function(err, tradings){
        res.send(tradings);
    });
});


router.get('/user/:user_id', function(req,res,next){
    Trading.find({user_id: req.params.user_id})
    .exec(function(err, tradings){
        res.send(tradings);
    });
});

router.post('/', function(req, res, next){
    const {timestamp, store_id, user_id, product_id, price} = req.body;
    const trading = new Trading({
        timestamp, 
        store_id, 
        user_id, 
        product_id, 
        price
    });

    trading.save()
    .then(function(trading){
        res.json(trading);
    })
    .catch(function(err){
        res.send(err);
    });
});

router.delete('/:id', function(req,res,next){
    Trading.deleteOne({_id: req.params.id})
    .exec(function(err, trading){
        res.send("Deleted trading")
    })
});

router.patch('/:id', function(req,res,next){
    Trading.updateOne({_id: req.params.id}, req.body)
    .exec(function(err, trading){
        res.send(req.body);
    })
});

module.exports = router;
