var Index = require( '../controller/index');
var About = require( '../controller/about');



exports.rootHandler = [

    { method: 'GET', path: '/', config: Index.index},
    { method: 'GET', path: '/search', config: Index.search},
    { method: 'GET', path: '/searchPage', config: Index.search},

    { method: 'GET', path: '/totalCnt', config: Index.totalCnt},
    { method: 'GET', path: '/about', config: About.index},


];
