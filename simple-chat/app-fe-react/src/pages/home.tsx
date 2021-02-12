// import { makeStyles, Theme, createStyles } from '@material-ui/core'
import '../assets/home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import HelloModal from './components/helloModal'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import io from 'socket.io-client'

// eslint-disable-next-line no-undef
let socket: SocketIOClient.Socket
type TContent = {
  text: string
  time: number
  image: string
  user: string
}
type TContents = TContent[]

type Tuser = {
  avatar: string
  name: string
  login: number
}

type Tusers = Tuser[]
type TPropsUsetList = {
  users : Tusers
}

type TPropsContentList = {
  contents : TContents
  myname: string
}

const tempUsers: Tusers = [
  {
    avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
    name: 'Vincent Porter',
    login: 1602423163050
  },
  {
    avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
    name: 'Aiden Chavez',
    login: 1602423163053
  },
  {
    avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
    name: 'Computer',
    login: 1602423163051
  }
]

const tempContents: TContents = [
  {
    text: 'Hi Vincent, how are you? How is the project coming along?',
    time: Date.now() - 300000,
    image: '',
    user: 'Olia'
  },
  {
    text: 'Are we meeting today? Project has been already finished and I have results to show you.',
    time: Date.now() - 200000,
    image: '',
    user: 'Vincent'
  },
  {
    text: 'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?',
    time: Date.now() - 100000,
    image: '',
    user: 'Olia'
  }
]

function RenderUserList ({ users } : TPropsUsetList) {
  const list = users?.map((user: Tuser, index) => (
    <li className="clearfix" key={user.login}>
      <img src={user.avatar} alt="avatar" />
      <div className="about">
        <div className="name">{user.name}</div>
        <div className="status">
          <FontAwesomeIcon icon={faCircle} className="online"/> online
        </div>
      </div>
    </li>
  ))
  return (
    <ul className="list">
      {list}
    </ul>
  )
}

function RenderContentList ({ contents, myname } : TPropsContentList) {
  const myItem = (content: TContent) => (
    <li className="clearfix" >
      <div className="message-data">
        <span className="message-data-time" >{content.time}</span> &nbsp; &nbsp;
        <span className="message-data-name" >{content.user}</span>&nbsp;
        <FontAwesomeIcon icon={faCircle} className="me"/>
      </div>
      <div className="message my-message">
        {content.text}
      </div>
    </li>
  )
  const otherItem = (content: TContent) => (
    <li className="clearfix" key={content.time}>
      <div className="message-data align-right">
        <span className="message-data-time" >{content.time}</span>  &nbsp; &nbsp;
        <span className="message-data-name" >{content.user}</span>&nbsp;
        <FontAwesomeIcon icon={faCircle} className="online"/>
      </div>
      <div className="message other-message float-right">
        {content.text}
      </div>
    </li>
  )
  const list = contents?.map((content: TContent, index) => (
    content.user === myname ? myItem(content) : otherItem(content)
  ))
  return (
    <ul>
      {list}
      <li>
        <FontAwesomeIcon icon={faCircle} className="online"/>
        <FontAwesomeIcon icon={faCircle} className="online" style={{ color: '#AED2A6' }}/>
        <FontAwesomeIcon icon={faCircle} className="online" style={{ color: '#DAE9DA' }}/>
      </li>
    </ul>
  )
}

function Home () {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState<Tusers>(tempUsers)

  const onCloseModal = (name_: string) => {
    console.log('onCloseModal name: ', name_)
    setName(name_)
  }

  const handleChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value)
  }

  const handleKeyUpTextarea = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      console.log('handleKeyUpTextarea Enter')
      actionSendMessage()
    }
  }

  const actionSendMessage = () => {
    if (message === null || message === undefined) {
      return
    }
    if (message === '') {
      return
    }
    if (message === '\n') {
      return
    }
    const content: TContent = {
      text: message,
      time: Date.now(),
      image: '',
      user: name
    }
    if (socket) {
      socket.emit('reqServerChat', content)
      setMessage('')
    }
  }

  useEffect(() => {
    // initUsers()
    if (name !== '') {
      initSocket()
      console.log('useEffect socket: ', socket)
    }
    return () => {
      if (socket !== null && socket !== undefined) { socket.close() }
      console.log('cleanup')
    }
  }, [name])

  // const initUsers = () => {
  //   setUsers(tempUsers)
  //   console.log('users : ', users)
  // }
  const initSocket = () => {
    console.log('initSocket')
    socket = io('http://localhost:3000/ws/simple-chat', { transports: ['websocket'] })

    socket.on('connect', () => {
      console.log('socket.on connect')
      // this.actionStoreClient()
      // this.$toast.success('접속 되었습니다.')
    })
    socket.on('resServerChat', (data: any) => {
      console.log('socket.on resServerChat : ', data)
      // this.actionsReceiveText(data)
    })
    socket.on('resNewUser', (data: any) => {
      console.log('socket.on resNewUser : ', data)
      // if (data.user !== this.myName) {
      //   this.$toast.success('새로운 유저 등장!')
      // }
      // this.users = data
    })
    socket.on('resOutUser', (data: any) => {
      console.log('socket.on resOutUser : ', data)
      // if (data.user !== this.myName) {
      //   this.$toast.success('다른 유저가 퇴장하였습니다.')
      // }
      // this.users = data
    })
    socket.on('disconnect', () => {
      console.log('socket.on disconnect')
      // this.$toast.success('연결이 종료 되었습니다.')
    })
  }

  // const renderUsers = users?.map((user: Tuser) =>
  //   <li className="clearfix" key={user.login}>
  //     <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
  //     <div className="about">
  //       <div className="name">Vincent Porter 11</div>
  //       <div className="status">
  //         <FontAwesomeIcon icon={faCircle} className="online"/> online
  //       </div>
  //     </div>
  //   </li>
  // )

  return (
    <>
      <div className="container clearfix">
        <div className="people-list" id="people-list">
          <RenderUserList users={users}/>
        </div>

        <div className="chat">
          <div className="chat-header clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />

            <div className="chat-about">
              <div className="chat-with">Chat with {name}</div>
              <div className="chat-num-messages">Happy Today</div>
            </div>
            <FontAwesomeIcon icon={faStar} />
          </div>

          <div className="chat-history">
            <RenderContentList contents={tempContents} myname={name} />
          </div>

          <div className="chat-message clearfix">
            <textarea
              name="message-to-send"
              id="message-to-send"
              placeholder ="Type your message"
              rows={3}
              value={message}
              onKeyUp={handleKeyUpTextarea}
              onChange={handleChangeTextarea}></textarea>

            <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o"></i>

            <HelloModal openProps={true} closeProps={onCloseModal}/>
            <button type="button" onClick={actionSendMessage}>Send</button>

          </div>

        </div>

      </div>

    </>
  )
}

export default Home
