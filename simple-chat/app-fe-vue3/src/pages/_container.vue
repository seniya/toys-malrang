<template>
  <header class="MuiPaper-root MuiAppBar-root MuiAppBar-positionFixed MuiAppBar-colorPrimary mui-fixed MuiPaper-elevation4" style="">
    <div class="MuiToolbar-root MuiToolbar-dense MuiToolbar-gutters">
      <h6 class="MuiTypography-root MuiTypography-h6 MuiTypography-colorInherit MuiTypography-noWrap">Simple Chat with Vue 3</h6>
      <!-- 
        <router-link to="/">Go to Home</router-link>
        <router-link to="/chat">Go to Chat</router-link>
       -->
    </div>
  </header>
  <main style="margin-top: 60px;">
    <div class="MuiContainer-root MuiContainer-maxWidthLg">      
      <Suspense>
        <template #default>
          <router-view></router-view>
        </template>
        <template #fallback>
          <div>Loading ...</div>
        </template>
      </Suspense>
    </div>
  </main>
  <footer>
    <span class="MuiTypography-root MuiTypography-caption MuiTypography-gutterBottom MuiTypography-alignRight">
      <p>출처 1: https://dribbble.com/shots/1818748-Appon-Chat-Widget / 출처 2: https://codepen.io/drehimself/pen/KdXwxR</p>
    </span>
  </footer>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Container',
})
</script>

<style>
</style>