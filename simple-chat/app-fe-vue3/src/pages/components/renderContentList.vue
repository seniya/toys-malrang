<template>
  <ul class="chat-ul" style="">
    <li class="clearfix" v-for="content in contents" :key="content.time">
      <div v-if="myname === content.user">
        <div class="message-data">
          <span class="message-data-time" >{{content.time}}</span> &nbsp; &nbsp;
          <span class="message-data-name" >{{content.user}}</span>&nbsp;        
          <i class="fa fa-circle me"></i>
        </div>
        <div v-if="content.text" class="message my-message">{{content.text}}</div>
        <span v-else></span>
        <div v-if="content.image" class="message my-message">
          <img class="content-image" :src="content.image"/>
        </div>
        <span v-else></span>
      </div>
      <div v-else>
        <div class="message-data align-right">
          <span class="message-data-time" >{{content.time}}</span>  &nbsp; &nbsp;
          <span class="message-data-name" >{{content.user}}</span>&nbsp;        
          <i class="fa fa-circle online"></i>
        </div>
        <div v-if="content.text" class="message other-message float-right">{{content.text}}</div>
        <span v-else></span>
        <div v-if="content.image" class="message other-message float-right">
          <img class="content-image" :src="content.image"/>
        </div>
        <span v-else></span>
      </div>
    </li>      
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RenderContentList',
  props: ['contents', 'myname'],
})
</script>

<style lang="scss" scoped>
 .content-image {
    max-width: 290px;
  }

  .chat-ul {
    position: absolute; 
    padding-right: 10px;
  }

</style>