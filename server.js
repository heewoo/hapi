'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {


        var elasticsearch = require('elasticsearch');
        var client = new elasticsearch.Client({
            host: 'search:9200',
            log: 'trace'
        });

        client.search({
            index: 'nutch',

                body: {
                    query: {
                        filtered: {
                            query: {
                                query_string: {
                                    query: encodeURIComponent(request.params.name)
                                }
                            }
                        }
                    },
                    fields: [
                        "id",
                        "title",
                        "host",
                        "url",
                        "anchor"
                    ],
                    from: 0,
                    size: 50,
                    sort: {
                        _score: {
                            "order": "desc"
                        }
                    },
                    explain: true
            }
        }).then(function (resp) {

            var hits = resp.hits.hits;

        }, function (err) {
            console.trace(err.message);
        });


        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }


});

server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {

    if (err) {
        throw err;
    }
    server.log('info', 'Server running at: ' + server.info.uri);
});
});