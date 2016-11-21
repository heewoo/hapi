'use strict';

const __viewPath = "/public/";
const __layoutPath = __viewPath + "views/layout/";


const Hapi = require('hapi');
const Good = require('good');
const Vision = require('vision');
const Router = require('./public/route/route');
const Logger = require("./public/module/loging/logging");


const server = new Hapi.Server();

server.connection({
    port: 3000,
    host: 'localhost',
    labels : ['gt']
});


//  route //
server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {

        return Router.rootHandler(request,reply,request.params.name);
    }
});




// register //
server.register(Vision, (err) => {

    Logger.logging(server,Good);

    if (err) {
        throw err;
    }

    server.views({
        engines: {
            ejs: require('ejs')
        },
        relativeTo: __dirname + __viewPath,
        layoutPath: __dirname + __layoutPath,
        path: 'views',
        layout: true
    });

});










