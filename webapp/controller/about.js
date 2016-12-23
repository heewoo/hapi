exports.index = {
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
            return reply.redirect('/index');
        }
        reply.view('about', {
            title: 'views/index.js | Hapi ' + request.server.version,
            message: 'Index - Hello World!',
            img_path: '../../public/img/'

        });
    }
};




