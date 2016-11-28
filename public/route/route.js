var Index = require( '../../public/controller/index');
var Ajax = require( '../../public/controller/ajax');





exports.rootHandler = [

    { method: 'GET', path: '/', config: Index.index},
    { method: 'GET', path: '/search', config: Index.search},
    { method: 'GET', path: '/totalCnt', config: Index.totalCnt}



];

//
// server.route([
//     { method: 'GET', path: '/', config: { handler: home } },
//     { method: ['GET', 'POST'], path: '/login', config: { handler: login, auth: { mode: 'try' }, plugins: { 'hapi-auth-cookie': { redirectTo: false } } } },
//     { method: 'GET', path: '/logout', config: { handler: logout } }
// ]);
//

