// const express = require('express')
// const app = express()
// const server = require('http').createServer(app)
// const portNo = 3001
// server.listen(portNo, () => {
//     console.log('Server is on', 'http://localhost:' + portNo)
// })
import io from 'socket.io-client'

console.log('socket io is working');
// const socketio = require('socket.io')

console.log(io)
// var socket = io('http://localhost:5002', {
//     path: '/mynamespace'
// })
var socket = io.connect("http://localhost:5003/mynamespace");
socket.on('connect', function() {
    socket.emit('my event', {data: 'I\'m connected!'});
});
/*socket.on('response', function(msg){ 
    console.log(msg);
}); */
socket.emit('request', {
    data: 'hihihi'
})

export { socket as io }

