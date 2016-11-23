var Index = require( '../../public/controller/index');





exports.rootHandler = [

    { method: 'GET', path: '/', config: Index.index}

];

//
// server.route([
//     { method: 'GET', path: '/', config: { handler: home } },
//     { method: ['GET', 'POST'], path: '/login', config: { handler: login, auth: { mode: 'try' }, plugins: { 'hapi-auth-cookie': { redirectTo: false } } } },
//     { method: 'GET', path: '/logout', config: { handler: logout } }
// ]);
//

