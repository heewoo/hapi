
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
            return reply.redirect('/home');
        }


        console.log("123");
        client.count(function (error, response, status) {


            return reply.view('index', {
                title: 'views/index.js | Hapi ' + request.server.version,
                message: 'Index - Hello World!',
                count:  response.count
            });



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
                            fields: ["host","id","title","url","content"],
                            tie_breaker: 0.2,
                            type: "best_fields"
                        }
                },
                fields:["host","id","title","url"],
                highlight: {
                    pre_tags:["<strong>"],
                    post_tags:["</strong>"],
                    fields: {
                        content:{}
                    }
                },
                sort:{
                    _score:{
                        order:"desc"
                    }
                },

                from:0,
                size:50,
                explain:true
            }
        }).then(function (resp) {
            const result = resp.hits;
            const resultHits =  result.hits;
            const content = new Array();

            for(i in resultHits){
                content.push(resultHits[i]);

            }

            console.log(resp);

            return reply.view('heewoo', {
                title: 'search | Hapi ' + request.server.version,
                message: '검색어 =' + keyword,
                contents:  content,
                total: result.total,
                took:  resp.took/1000
            });

        }, function (err) {
            console.trace(err.message);
        });




    }
};
