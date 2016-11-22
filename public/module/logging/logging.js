exports.logging = function(server,Good) {
    server.register(
        /*  logging */
        {
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
        },
        (err) => {
            if (err) {
                throw err;
            }
        });
}

