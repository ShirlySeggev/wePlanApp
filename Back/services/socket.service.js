const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null
var gSocketBySessionIdMap = {}

function emit({ type, data }) {
    gIo.emit(type, data);
}


function connectSockets(http, session) {
    gIo = require('socket.io')(http);

    const sharedSession = require('express-socket.io-session');

    gIo.use(sharedSession(session, {
        autoSave: true
    }));

    gIo.on('connection', socket => {
        console.log('connection');
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket

        socket.on('board update', msg => {
            socket.to(socket.myTopic).emit('update board', 'update from server')
            // socket.broadcast.emit('update board', 'update from server')
        })

        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })

        socket.on('chat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            console.log('topic', topic);
            socket.join(topic)
            socket.myTopic = topic
        })
        socket.on('boards update', msg => {
            // socket.to(socket.myTopic).emit('update boards', 'update from server')
            socket.broadcast.emit('update boards', 'update from server')
        })
        socket.on('task add member', (notification) => {
            // socket.to(socket.myTopic).emit('board add notification', notification)
            socket.broadcast.emit('board add notification', notification)
        })


    })
}

// Send to all sockets BUT not the current socket 
function broadcast({ type, data }) {
    const store = asyncLocalStorage.getStore()
    const { sessionId } = store
    if (!sessionId) return logger.debug('Shoudnt happen, no sessionId in asyncLocalStorage store')
    const excludedSocket = gSocketBySessionIdMap[sessionId]
    if (!excludedSocket) return logger.debug('Shouldnt happen, No socket in map', gSocketBySessionIdMap)
    excludedSocket.broadcast.emit(type, data)
}

module.exports = {
    connectSockets,
    emit,
    broadcast
}



