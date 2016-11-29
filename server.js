'use strict';

const __viewPath = "/webapp";

const Path = require('path');
const Hapi      = require('hapi');
const Good      = require('good');
const Vision    = require('vision');
const Auth      = require('hapi-auth-cookie');
const Ejs       = require('ejs');
const Inert       = require('inert');
var Boom = require('boom');


const Logger      = require("./webapp/module/logging/logging");
const Router      = require('./webapp/route/route');


const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});


server.connection({
    port: 3000,
    host: 'localhost',
    labels: ['gt']
});



// logger module //
Logger.logging(server, Good);

// route register //
server.register( [Auth,Vision,Inert],   function (err){

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
        layoutPath: __dirname + __viewPath+'/views',
        path: 'views',
        layout: true
    });


    // 404 redirect
    server.ext('onPreResponse', function (request,response, reply) {
        if (request.response.isBoom || response.output.statusCode !== 404) {
            // return reply.redirect('/');
        }
        return reply.continue();
    });

    server.ext('onRequest', function (request, reply) {
        var status;
        //Check status of redis instance

        if (status) {
            //Redis is running, continue to handler
            return reply.continue();
        } else {
            //Redis is down, reply with error
            return reply(Boom.unauthorized('Auth server is down'));
        }
    });



    server.route({ method: 'GET', path: '/public/js/{file*}', handler: {
        directory: {
            path: 'public/js',
            listing: true
        }
    }});


    server.route({ method: 'GET', path: '/public/css/{file*}',handler: {
        directory: {
            path: 'public/js',
            listing: true
        }
    }});




    server.route(Router.rootHandler);

});





server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log("Hapi start on port: 3000");
});




