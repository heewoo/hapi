'use strict';

const __viewPath = "/public";
const __layoutPath = __viewPath + "/views/layout/";


const Hapi      = require('hapi');
const Good      = require('good');
const Vision    = require('vision');
const Auth      = require('hapi-auth-cookie');
const Ejs       = require('ejs');


const Logger      = require("./public/module/logging/logging");
const Router      = require('./public/route/route');


const server = new Hapi.Server();

server.connection({
    port: 3000,
    host: 'localhost',
    labels: ['gt']
});



// logger module //
Logger.logging(server, Good);

// route register //
server.register( [Auth,Vision],   function (err){

    if (err) {
        throw err;
    }

    // const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    // server.app.cache = cache;


    server.auth.strategy('session', 'cookie', true, {
        password: 'password-should-be-32-characters',
        cookie: 'sid-example',
        // redirectTo: '/',
        isSecure: false
    });


    server.views({
        engines: {ejs: Ejs},
        relativeTo: __dirname + __viewPath,
        layoutPath: __dirname + __layoutPath,
        path: 'views',
        layout: true
    });


    // 404 redirect
    server.ext('onPreResponse', function (request, reply) {
        if (request.response.isBoom) {
            return reply.redirect('/');
        }
        return reply.continue();
    });


    server.route(Router.rootHandler);

});





server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log("Hapi start on port: 3000");
});




