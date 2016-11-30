var Index = require( '../controller/index');



exports.rootHandler = [

    { method: 'GET', path: '/', config: Index.index},
    { method: 'GET', path: '/search', config: Index.search},
    { method: 'GET', path: '/searchPage', config: Index.search},
    { method: 'GET', path: '/totalCnt', config: Index.totalCnt},



];
