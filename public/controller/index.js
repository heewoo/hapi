
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

        return reply.view('index', {
            title: 'views/index.js | Hapi ' + request.server.version,
            message: 'Index - Hello World!'
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

        console.log(params.q);
        client.search({
            index: 'nutch',
        //     body:
        //         {
        //             query:{
        //                     filtered: {
        //                         query: {
        //                             match: {
        //                                 _all: "자바 월드",
        //                                 fuzziness: "AUTO"
        //                             }
        //                         }
        //                     }
        //             },
        //             filter: {
        //                 term: {content: "자바 월드"}
        //             },
        //
        //             fields:["id","title","host","url","content"],
        //             from:0,
        //             size:50,
        //             sort:{_score:{order:"desc"}},
        //             explain:true,
        //             highlight: {
        //                 pre_tags:["<strong>"],
        //                 post_tags:["</strong>"],
        //                 fields: {
        //                     title: {}
        //                 }
        //             }
        // }
            body: {
                query:{
                    match: {
                            title : keyword
                        }
                },
                fields:["host","id","title","url","content"],
                highlight: {
                    pre_tags:["<strong>"],
                    post_tags:["</strong>"],
                    fields: {
                        title:{}
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
            const result = resp.hits.hits;
            const content = new Array();
            const contentHighlight = new Array();

            for(i in result){
                content.push(result[i].fields);
            }


            console.log(result);

            return reply.view('heewoo', {
                title: 'search | Hapi ' + request.server.version,
                message: '검색어 =' + keyword,
                contents:  content
            });

        }, function (err) {
            console.trace(err.message);
        });




    }
};
