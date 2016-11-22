'use strict';

const __viewPath = "/public";
const __layoutPath = __viewPath + "/views/layout/";


const Hapi      = require('hapi');
const Good      = require('good');
const Vision    = require('vision');
const Auth      = require('hapi-auth-cookie');
const Ejs       = require('ejs');
var Logger      = require("./public/module/logging/logging");
var Router      = require('./public/route/route');


const server = new Hapi.Server();

server.connection({
    port: 3000,
    host: 'localhost',
    labels: ['gt']
});



// register //
server.register([require('hapi-auth-cookie'), require('vision')],  (err) =>{

    if (err) {
        throw err;
    }

    Logger.logging(server, Good);

    server.auth.strategy('session', 'cookie', {
        password: 'secret',
        cookie: 'session',
        isSecure: false,
        ttl: 24* 60 * 60 * 1000
    });

    server.views({
        engines: {
            ejs: Ejs
        },
        relativeTo: __dirname + __viewPath,
        layoutPath: __dirname + __layoutPath,
        path: 'views',
        layout: true
    });

});

server.route(Router.rootHandler);


server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log("Hapi start on port: 3000");
});