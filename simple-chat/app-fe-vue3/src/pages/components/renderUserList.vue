<template>
  <ul class="list" >
    <li v-for="user in users" :key="user.login" class="clearfix">
      <img :src="user.avatar" alt="avatar" />
      <div class="about">
        <div class="name">{{user.name}}</div>
        <div class="status">
          <i class="fa fa-circle me"></i> online
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RenderUserList',
  props: ['users'],
  mounted() {
    console.log('users : ', this.users)
  }
})
</script>

<style>

</style>