import { Error } from 'mongoose';

const express = require('express');
const router = express.Router();
const slug = require('slug');
const Playground = require('./../schemes/mongoose/playground');
const request = require('request');
const http = require('http');
const unirest = require('unirest');
const axios = require('axios');

/* GET json data playground service */
router.get('/service/names', (req, res, next) => {
    Playground.aggregate([
        {
            $group: {
                _id: '$name',
                version: { $first: '$version' },
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
            res.send({ message: "Service Data Info Not Found.", data: null });
            res.end();
        } else {
            res.send({ message: "Service Data Info.", data: pgdata });
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
            originalId: { $last: '$_id' },
            version: { $last: '$version' },
            slug: { $last: '$slug' },
            description: { $last: '$description' },
            endpoints: { $last: '$endpoints' },
        },
    }, (err, pgdata) => {
        if (!pgdata) {
            res.status(404);
            res.send({ message: "Service List Data.", data: [] });
            res.end();
        } else {
            res.send({ message: "Service List Data.", data: pgdata });
        }
    });
});

router.post('/request-access-token', (req, res, next) => {
    let data = req.body;

    if (!process.env.AUTH_HOST) {
        res.statusCode = 400;
        res.send({
            body: {
                message: "AUTH_HOST in .env must be defined"
            }
        });
        res.send();
    }

    var request = unirest.post(process.env.AUTH_HOST);

    request.headers({
        "Content-Type": "application/json"
    });

    request.send({
        username: data.username,
        password: data.password
    });

    request.end((result) => {
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

    let params = data.params;
    let url = data.url;
    let jwt = data.jwt;
    let method = data.method[0];
    let body = data.body;

    let newParams = {};
    for (let i = 0; i < params.length; i++) {
        newParams[params[i].key] = params[i].value;
    }

    var request = unirest(method, process.env.API_HOST + url, body);

    request.headers({
        "Authorization": jwt
    });

    request.query(newParams);

    request.end(function (result) {
        if (result.error) {
            res.statusCode = result.statusCode;
            res.send(result);
        } else {
            res.send(result.body);
        }
    });
});

module.exports = router;
