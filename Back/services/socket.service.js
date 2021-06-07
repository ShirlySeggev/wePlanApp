const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null
var gSocketBySessionIdMap = {}

function emit({ type, data }) {
    gIo.emit(type, data);
}


function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
           origin: 'http://localhost:3000',
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        }
    });

    const sharedSession = require('express-socket.io-session');

    gIo.use(sharedSession(session, {
        autoSave: true
    }));

    gIo.on('connection', socket => {
        console.log('connection');
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket

        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })

        socket.on('board added', msg => {
            socket.broadcast.emit('board added', 'board created')
        })

        socket.on('board updated', boardId => {
            console.log(boardId)
            socket.broadcast.emit('board updated', boardId)
        })

        socket.on('board removed', msg => {
            console.log(msg)
            socket.broadcast.emit('board removed', msg)
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



