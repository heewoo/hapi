exports.totalCnt = {
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    handler: function (req, reply) {
        reply({result: true, msg: "hi"});
    }
};
