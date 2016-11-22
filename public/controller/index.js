
exports.index = {
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    handler: function (request, reply) {

        if (request.auth.isAuthenticated) {
            return reply.redirect('/home');
        }
        return reply.view('index');
    }
};
