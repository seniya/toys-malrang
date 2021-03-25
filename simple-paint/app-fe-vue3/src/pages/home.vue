<template>
  <div>
    <div class="bg-img"></div>

      <canvas class="canvas"></canvas>

      <nav class="tools-bar">
      <div class="button button-clear" data-clear ></div>
      </nav>

      <nav class="thickness-bar">
        <div class="thickness" data-thickness="3" ></div>
        <div class="thickness" data-thickness="5" ></div>
        <div class="thickness" data-thickness="8" ></div>
        <div class="thickness" data-thickness="15" ></div>
        <div class="thickness" data-thickness="30" ></div>
      </nav>

      <nav class="color-bar">
        <div class="color" data-color="#9b59b6" ></div>
        <div class="color" data-color="#3498db" ></div>
        <div class="color" data-color="#2ecc71" ></div>
        <div class="color" data-color="#1abc9c" ></div>
        <div class="color" data-color="#f1c40f" ></div>
        <div class="color" data-color="#e67e22" ></div>
        <div class="color" data-color="#E73C61" ></div>
      </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Home'
})
</script>

<style>

</style>
