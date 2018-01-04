import { Error } from 'mongoose';

var express = require('express');
var router = express.Router();
var slug = require('slug');
var Playground = require('./../schemes/mongoose/playground');
var request = require('request');
var http = require('http');
var unirest = require('unirest');

/* GET json data playground service */
router.get('/service/names', (req, res, next) => {
    Playground.aggregate([
        {
            $group: {
                _id: '$name',
                version: {$first: '$version'},
            }
        }
    ], (err, result) => {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    })
});

/* GET json data playground service */
router.get('/service/:slug/:version', (req, res, next) => {
    let filterParams = {};

    filterParams.slug = req.params.slug;
    filterParams.version = req.params.version;

    Playground.findOne(filterParams, (err, pgdata) => {
        if (!pgdata) {
            res.status(404);
            res.send({message: "Service Data Info Not Found.", data: null});
            res.end();
        } else {
            res.send({message: "Service Data Info.", data: pgdata});
        }
    });
});

/**
 * Get all service json data
 */
router.get('/service', (req, res, next) => {
    Playground.aggregate({
        $group: {
            _id: '$name',
            originalId: {$last: '$_id'},
            version: {$last: '$version'},
            slug: {$last: '$slug'},
            description: {$last: '$description'},
            endpoints: {$last: '$endpoints'},
        },
    }, (err, pgdata) => {
        if (!pgdata) {
            res.status(404);
            res.send({message: "Service List Data.", data: []});
            res.end();
        } else {
            res.send({message: "Service List Data.", data: pgdata});
        }
    });
});

/* POST generated json data to db */
router.post('/service', (req, res, next) => {

    let data = req.body;
    let slugName = slug(data.name, {lower: true});

    Playground.findOne({slug: slugName, version: data.version.name}, (err, pgdata) => {

        if (err) return console.error(err);

        if (!pgdata) {

            var pgdata = new Playground({
                name: data.name,
                slug: slug(data.name, {lower: true}),
                description: data.description || "",
                version: data.version.name,
                endpoints: []
            });

            data.version.endpoints.map(function (obj) {
                pgdata.endpoints.push(obj);
            })

            pgdata.save((err, pgresult) => {
                if (err) return console.error(err);

                res.send(pgresult);
            });

        } else {

            pgdata.description = data.description || "";
            pgdata.endpoints = [];

            data.version.endpoints.map((obj) => {
                pgdata.endpoints.push(obj);
            });

            pgdata.updatedAt = Date.now();

            pgdata.save((err, pgresult) => {
                if (err) return console.error(err);

                res.send(pgresult);
            });
        }
    });

});

router.post('/request-access-token', (req, res, next) => {
    let data = req.body;

    var request = unirest("POST", process.env.AUTH_HOST);

    request.headers({
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded"
    });

    request.form({
        "grant_type": data.grant_type,
        "client_id": data.client_id,
        "client_secret": data.client_secret,
        "username": data.username,
        "password": data.password
    });

    request.end(function (result) {
        if (result.error) {
            res.statusCode = result.statusCode;
            res.send(result);
        } else {
            res.send(result.body);
        }
    });
});

router.post('/request-client', (req, res, next) => {
    let data = req.body;
    let url = data.url;
    let jwt = data.jwt;

    var request = unirest(data.method[0], process.env.API_HOST + url);

    request.headers({
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
    });

    delete data.url;
    delete data.jwt;
    delete data.method;

    request.type("json");
    request.send(data);

    request.end(function (result) {
        if (result.error) {
            res.statusCode = result.statusCode;
            return res.send(result);
        } else {
            return res.send(result.body);
        }
    });
});

module.exports = router;
