<template>
  <Modal v-if="isShow" :close="closeModal" :options="modalOptions">
    <div class="modal">      
      <div class="modal-container">
        <div class="modal-item-1">
          <p>
            * This App save Anything Information <br />
            ** Please Input display-name
          </p>
          <p style="margin-top:50px;">
            <input 
              id="outlined-basic" 
              type="text" 
              class="MuiInputBase-input MuiOutlinedInput-input"
              v-model="name"
              ref="refModalInputName"
              @keyup.enter.up="handleClose">
            &nbsp;
            <button @click="handleClose">Enter</button>
          </p>
        </div>
        <div class="modal-item-2" title="Image From material-ui.com" style=""></div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

export default defineComponent({
  name: 'helloModal',
  props: ['openProps', 'closeProps'],
  setup (props) {

    const refModalInputName = ref<HTMLElement | null>(null)
    const name = ref<string>(`anyName_${(Math.random()).toFixed(4)}`)
    const modalOptions = ref<object>({closeClickDimmed: false})
    const isShow = ref<boolean>(props.openProps)

    function showModal () {
      isShow.value = true
    }
    function closeModal () {
      isShow.value = false
    }
    function handleClose () {
      if (name.value === null || name.value === '') {        
        const toast = useToast();
        toast.error('Check display-name', {
          timeout: 2000,
          hideProgressBar: true,
        })
        return
      }
      props.closeProps(name.value)
      closeModal()
    }

    onMounted(() => {
      if (refModalInputName.value) {
        refModalInputName.value.focus()
      }
    })

    return {
      name,
      isShow,
      modalOptions,
      refModalInputName,
      showModal,
      closeModal,
      handleClose
    }
  },
  methods: {
    
  }
})
</script>

<style scoped lang="scss">
.modal {
  width: 400px;
  padding: 0px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 13px;
  text-align: center;
  color: black;
}

.modal-container {
	display: flex;
	/* display: inline-flex; */

  .modal-item-1 {
    width: 250px; 
    height:160px; 
  }
  .modal-item-2 {
    width: 150px; 
    height: 160px; 
    background-image: url('https://material-ui.com/static/images/cards/live-from-space.jpg');
  }
}
</style>