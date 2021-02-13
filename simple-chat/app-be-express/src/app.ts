import * as express from 'express'
import * as http from 'http'
import * as morgan from 'morgan'

const app = express()
const server = http.createServer(app)
const port: number = 3000

app.set('port', port)
app.use(morgan('dev'))
app.get('/test', (req, res) => {
  res.send('Hello World!')
})

/** Socket.IO 추가 : simple-chat 전용 **/
const io = require('socket.io')(server, { origins: '*:*' })
const SimpleChat = require('./routes/apiSimpleChat')
const simpleChat = new SimpleChat(io)
simpleChat.registerOn()

server.listen(port)
server.on('listening', () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Listening on ', bind)
})
