
var Elasticsearch = require('elasticsearch');
var client = new Elasticsearch.Client({
    host: 'search:9200',
    log: 'info'
});

exports.index = {
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
            return reply.redirect('/index');
        }
          reply.view('index', {
            title: 'views/index.js | Hapi ' + request.server.version,
            message: 'Index - Hello World!',
            dirname: 'http://localhost:3000'

        });
    }
};


exports.totalCnt = {
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    handler: function (req, reply) {
        client.count(function (error, response, status) {
            reply({result: true, count: response.count});
        });
    }
};





exports.search = {
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    handler: function (request, reply) {
        const params = request.query;
        const keyword = params.q;
        const result = "";
        // view heewoo - >search //
        // elasticsearch-odm - npm 추후 적용 ( https://www.npmjs.com/package/elasticsearch-odm ) //

        client.search({
            index: 'nutch',
            body: {
                query:{
                    multi_match: {
                            query: keyword,
                            fields: ["content"],
                            tie_breaker: 0.1,
                            type: "best_fields",
                            fuzziness: "AUTO"
                        }
                },
                fields:["host","id","title","url"],
                sort:{
                    _score:{
                        order:"desc"
                    }
                },
                highlight: {
                    // pre_tags:["<strong>"],
                    // post_tags:["</strong>"],
                    fields: {
                        content:{}
                    }
                },
                from:0,
                size:50,
                explain:true
            }
        }).then(function (resp) {
            const resultHits =  resp.hits.hits;
            const content = new Array();

            for(i in resultHits){

                    content.push(resultHits[i]);

            }

            return reply.view('search', {
                title   :  'search | Hapi ' + request.server.version,
                keyword :  keyword,
                contents:  content,
                total   :  resp.hits.total,
                took    :  resp.took/1000
            });

        }, function (err) {
            console.trace(err.message);
        });

    }
};
