import * as faker from 'faker'

type TClient = {
  name: string
  login: number
  avatar: string
  clientId: string
}
type TClients = TClient[]

type TContent = {
  text: string
  time: number
  image: string
  user: string
}

class SimpleChat {
  private clients: TClients
  private io: any
  private ioSimpleChat: any

  constructor (io) {
    this.clients = [
      {
        name: 'Computer-fake',
        login: Date.now(),
        avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg',
        clientId: 'Computer-fake'
      }
    ]
    this.io = io
    this.ioSimpleChat = this.io.of('/ws/simple-chat')
  }

  registerOn () {
    this.ioSimpleChat.on('connection', socket => {
      console.log('ioSimpleChat connection')
      socket.on('reqStoreClient', (data: TClient) => {
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

      socket.on('reqServerChat', (data: TContent) => {
        console.log('reqServerChat data : ', data)
        this.ioSimpleChat.emit('resServerChat', data)

        if ((data.text).indexOf('pc') === 0) {
          const fakeContents = {
            text: faker.lorem.sentence(),
            time: Date.now(),
            image: faker.image.imageUrl(),
            user: 'Computer-fake'
          }
          setTimeout(() => {
            this.ioSimpleChat.emit('resServerChat', fakeContents)
          }, 500)
        }
      })
    })
  }
}

module.exports = SimpleChat
