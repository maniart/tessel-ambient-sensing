var http = require('http'),
    ambient = require('./ambient');


function start(route, handle) {
  function onRequest(request, response) {
    console.log('onRequest says: Request received');
  };
  http.createServer(onRequest).listen(8888);
  console.log('server.js says: Server init'); 
  ambient.foo();
};


start();