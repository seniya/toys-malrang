class SimpleChat {
  constructor (io) {
    // this.server = server;
    this.clients = []
    // this.io = require('socket.io')(server, { origins: '*:*' });
    this.io = io
    this.ioSimpleChat = this.io.of('/ws/simple-chat')
  }

  registerOn () {
    this.ioSimpleChat.on('connection', socket => {
      console.log('ioSimpleChat connection')
      socket.on('reqStoreClient', data => {
        // const clientInfo = new Object()
        // clientInfo.name = data.name
        // clientInfo.login = Date.now()
        // clientInfo.avatar = data.avatar
        // clientInfo.clientId = socket.id
        const clientInfo = {
          name: data.name,
          login: Date.now(),
          avatar: data.avatar,
          clientId: socket.id
        }
        this.clients.push(clientInfo)
        this.ioSimpleChat.emit('resNewUser', this.clients)
      })

      socket.on('disconnect', () => {
        for (let i = 0, len = this.clients.length; i < len; ++i) {
          const c = this.clients[i]
          if (c.clientId === socket.id) {
            this.clients.splice(i, 1)
            break
          }
        }
        this.ioSimpleChat.emit('resOutUser', this.clients)
      })

      socket.on('reqServerChat', (data) => {
        console.log('reqServerChat data : ', data)
        this.ioSimpleChat.emit('resServerChat', data)
      })
    })
  }
}

module.exports = SimpleChat

/** * Socket.IO 추가 : simple-chat 전용
let connectCounter = 0;
const clients = []
const io = require('socket.io')(server, { origins: '*:*' });
const ioSimpleChat = io.of('/study/simple-chat');
ioSimpleChat.on('connection', socket => {
  connectCounter++;
  socket.on('reqStoreClient', function (data) {
    const clientInfo = new Object();
    clientInfo.name = data.name;
    clientInfo.login = Date.now();
    clientInfo.avatar = data.avatar
    clientInfo.clientId = socket.id;
    clients.push(clientInfo);
    ioSimpleChat.emit('resNewUser', clients);
  });

  socket.on('disconnect', () => {
    connectCounter--;
    for (let i = 0, len = clients.length; i < len; ++i) {
      const c = clients[i];
      if (c.clientId == socket.id) {
        clients.splice(i, 1);
        break;
      }
    }
    ioSimpleChat.emit('resOutUser', clients);
  });

  socket.on('reqServerChat', (data) => {
    console.log('reqServerChat data : ', data)
    ioSimpleChat.emit('resServerChat', data);
  });
});
***/
