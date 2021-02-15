<template>
  <div class="container clearfix">
    <div class="people-list" id="people-list">
      <RenderUserList :users="users" />
    </div>

    <div class="chat">
      <div class="chat-header clearfix">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />

        <div class="chat-about">
          <div class="chat-with">Chat with {name}</div>
          <div class="chat-num-messages">Happy Today</div>
        </div>
        <i class="fa fa-star"></i>
      </div>

      <div class="chat-history" style="position: relative;" >
        <RenderContentList :contents="contents" :myname="name" ref="refRenderContentList"/>
      </div>

      <div class="chat-message clearfix">
        <textarea
          name="message-to-send"
          id="message-to-send"
          placeholder ="Type your message"
          :rows="3"
          v-model="message"
          @keyup.enter.up="actionSendMessage"></textarea>
        <input 
          type="file" 
          id="file" 
          name="file" 
          accept=".gif, .png, .jpg"
          @change="handleChangeFile"/>
        <button type="button" @click="actionSendMessage">Send</button>
      </div>

    </div>
  </div>
  <HelloModal :openProps="true" :closeProps="onCloseModal" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useToast } from "vue-toastification"
import RenderUserList from './components/renderUserList.vue'
import RenderContentList from './components/renderContentList.vue'
import HelloModal from './components/helloModal.vue'
import {io, Socket} from 'socket.io-client'

let socket: Socket

type Tuser = {
  avatar: string
  name: string
  login: number
}

type Tusers = Tuser[]
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
    avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg',
    name: 'Computer',
    login: 1602423163051
  }
]

type TContent = {
  text: string
  time: number
  image: string
  user: string
}
type TContents = TContent[]

const tempContents: TContents = [
  {
    text: 'Hi There, 바르고 고운말 부탁합니다.pc 라고 부르면 컴퓨터가 이야기해요. 예) pc 안녕? 이미지 보여줘',
    time: Date.now() - 300000,
    image: '',
    user: 'Computer-fake'
  }
]


export default defineComponent({
  name: 'Chat',
  components: {
    RenderUserList,
    RenderContentList,
    HelloModal
  },

  setup() {
    const toast = useToast();

    const refRenderContentList = ref<any>(null)
    const message = ref<string>('')
    const name = ref<string>('')
    const users = ref<Tusers>(tempUsers)
    const contents = ref<TContents>(tempContents)

    const initSocket = () => {
      console.log('initSocket')
      socket = io(':8101/ws/simple-chat', { transports: ['websocket'] })

      socket.on('connect', () => {
        console.log('socket.on connect')
        actionStoreClient()
      })
      socket.on('resServerChat', (data: TContent) => {
        console.log('socket.on resServerChat : ', data)
        actionsReceiveText(data)
      })
      socket.on('resNewUser', (data: Tusers) => {
        console.log('socket.on resNewUser : ', data)
        actionResNewUser(data)
      })
      socket.on('resOutUser', (data: Tusers) => {
        console.log('socket.on resOutUser : ', data)
        actionResOutUser(data)
      })
      socket.on('disconnect', () => {
        console.log('socket.on disconnect')
      })
    }

    function onCloseModal (name_: string) {
      console.log('onCloseModal : name : ', name_)
      name.value = name_
      initSocket()
    }

    const handleChangeFile = (e: Event) => {      
      const target = e.target as HTMLInputElement;
      const files = target.files
      if (files !== null && files?.length > 0) {
        const reader = new FileReader()
        reader.onloadend = function () {
          const imageMsg = (reader.result)?.toString()
          actionSendImage(imageMsg || '')
          target.value = ''
          target.files = null
        }
        reader.readAsDataURL(files[0])
      }
    }

    const actionStoreClient = () => {
      let randomInt = Math.floor(Math.random() * 10)
      if (randomInt === 0) randomInt = 1
      if (randomInt > 8) randomInt = 8
      const avatar_ = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg'
      socket.emit('reqStoreClient', {
        name: name.value,
        avatar: avatar_
      })
    }

    const actionsReceiveText = (data: TContent) => {      
      contents.value.push(data)
      actionScrollToBottom()
    }

    function actionSendMessage () {
      console.log('message.value : ', message.value)
      if (message.value === null || message.value === undefined) {
        return
      }
      if (message.value === '') {
        return
      }
      if (message.value === '\n') {
        return
      }
      const content: TContent = {
        text: message.value,
        time: Date.now(),
        image: '',
        user: name.value
      }
      if (socket) {
        socket.emit('reqServerChat', content)
        message.value = ''
      }
    }

    const actionSendImage = (image: string) => {
      if (image === null || image === undefined) {
        return
      }
      if (image === '') {
        return
      }
      const content: TContent = {
        text: '',
        time: Date.now(),
        image,
        user: name.value
      }
      if (socket) {
        socket.emit('reqServerChat', content)
        message.value = ''
      }
    }

    const actionResNewUser = (data: Tusers) => {
      users.value = data      
      toast.info('새로운 유저 등장!', {
        timeout: 2000,
        hideProgressBar: true,
      })
    }

    const actionResOutUser = (data: Tusers) => {
      users.value = data
      toast.info('다른 유저가 퇴장하였습니다.', {
        timeout: 2000,
        hideProgressBar: true,
      })
    }

    const actionScrollToBottom = () => {      
      setTimeout(() => {
        if (refRenderContentList !== null) {
          refRenderContentList.value.$el.scrollIntoView({ block: 'end', behavior: 'smooth' })
        }        
      }, 100);
    }

    return { 
      name,
      message,
      refRenderContentList,
      users,
      contents,
      onCloseModal,
      handleChangeFile,
      actionSendMessage
    }
  }
})
</script>

<style>

</style>