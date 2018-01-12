'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const parser = require('swagger-parser');
const acceptedHttpMethods = ['get', 'post', 'put', 'delete'];
const slug = require('slug');

const mongoose = require('mongoose');
const tunnel = require('tunnel-ssh');
const colors = require('colors/safe');
const Playground = require('./../src/api/schemes/mongoose/playground');
const Promise = require('bluebird');

mongoose.Promise = Promise;

let file = fs.readFileSync(
    path.join(__dirname, "open_api_scheme.json"),
    "utf8"
);

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        ;
}

file = JSON.parse(file);

parser.validate(file)
    .then(api => {
        fs.writeFileSync(
            path.join(__dirname, "open_api_scheme_parsed.json"),
            JSON.stringify(api),
            "utf8"
        );
    })
    .catch(err => {
        throw new Error(err.message);
    })

file = JSON.parse(fs.readFileSync(
    path.join(__dirname, "open_api_scheme_parsed.json"),
    "utf8"
));

let paths = file.paths;
let services = {};

for (let path in paths) {
    for (let method in paths[path]) {
        let methodData = paths[path][method];

        let serviceName = methodData.tags[0];

        let endpointDescription = methodData.summary;
        let endpointSlug = convertToSlug(serviceName);
        let endpointPath = path;
        let endpointMethod = method;

        if (!services.hasOwnProperty(endpointSlug)) {
            services[endpointSlug] = {
                name: serviceName,
                slug: endpointSlug,
                description: `${serviceName} Service`,
                version: 'v1'
            };
        };

        if (!services[endpointSlug].endpoints) {
            services[endpointSlug].endpoints = [];
        };

        if (acceptedHttpMethods.indexOf(method) !== -1) {
            let endpoint = {
                title: endpointDescription,
                path: path,
                fields: [],
                roles: [],
                scopes: [],
                method: [endpointMethod.toUpperCase()]
            };

            if (method !== 'get') {
                let endpointParams = methodData.parameters;

                for (let i = 0; i < endpointParams.length; i++) {
                    // only parse when there's body parameters
                    if (endpointParams[i].in === 'body') {
                        // array of fields
                        let fields = endpointParams[i].schema.properties;
                        let fieldsRequired = endpointParams[i].schema.required;
                        let fieldsTitle = endpointParams[i].schema.title;
                        let required = endpointParams[i].required;

                        if (typeof fieldsRequired !== 'array') {
                            fieldsRequired = [];
                        }

                        for (let field in fields) {
                            let fieldData = {
                                constraints: [],
                                default_value: null,
                                required: (fieldsRequired.indexOf(field) ? true : false),
                                description: '',
                                type: (fields[field].type ? fields[field].type : 'text'),
                                name: field
                            };

                            endpoint.fields.push(fieldData);
                        }
                    }
                }
            }


            services[endpointSlug].endpoints.push(endpoint);
        }
    }
}

// load database configuration
require('./../src/common/configs/db');

let result = Playground.remove({})
    .then(res => {
        log(colors.cyan(``));
        log(colors.cyan(`√ Collection cleared`));
        log(colors.cyan(``));

        let totalKeys = Object.keys(services).length;
        let flag = 0;

        if (typeof services === 'object') {
            for (let i in services) {
                let data = services[i];
                let slugName = slug(data.name, { lower: true });

                var playground = new Playground({
                    name: data.name,
                    slug: slug(data.name, { lower: true }),
                    description: data.description || "",
                    version: data.version.name,
                    endpoints: []
                });

                for (let i = 0; i < data.endpoints.length; i++) {
                    playground.endpoints.push(data.endpoints[i]);
                }

                playground.save()
                    .then(result => {
                        flag++;
                        if (flag === totalKeys) {
                            log(colors.green(`√ Inserting ${data.name}`));
                            finish();
                        } else {
                            log(colors.green(`√ Inserting ${data.name}`));
                        }
                    })
                    .catch(err => log(err))
            }
        }
    })
    .catch(err => {
        console.log(colors.red(`X Invalid parsed configs : ${err.message}`));
        process.exit(0);
    });

function finish() {
    console.log(colors.cyan(``))
    console.log(colors.cyan(`√ Parsing Successful`))
    console.log(colors.cyan(``))
        
    process.exit(0);
}

function log(message = 'test') {
    console.log(message);
}