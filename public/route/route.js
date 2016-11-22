var Authent = require('../../public/controller/authentication');
var Index = require( '../../public/controller/index');


exports.rootHandler = [

    { method: 'GET', path: '/', config: { handler: Index.index}}

];
