// const Index = require('../controller/index');


exports.rootHandler = function (request, reply,viewName) {
    reply.view(viewName, {
        title: 'examples/views/ejs/index.js | Hapi ' + request.server.version,
        message: 'Index - Hello World!'
    });
};

// exports.rootHandler = [
//     { method: 'GET', path: '/', config: Index.index }
// ];
