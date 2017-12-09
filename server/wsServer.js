const ws = require('nodejs-websocket');

const server = ws.createServer( conn => {
    console.log('New connection!');
    conn.on('text', function(str) {
        console.log('Received: ' + str);
        conn.sendText(str);
    });
    conn.on('error', err => {
        console.log(err);
    })
    conn.on('close', (code, reason) => {
        console.log('Connection closed!');
    });
}).listen(3001);

console.log('websocket is listening on port 3001!');