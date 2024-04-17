<script>
import { ref, onMounted } from 'vue';
const state_message = ref("State kommer her")
const change_message = ref("Change kommer her")

export default {
  setup() {
    async function responseEntity() {
      try {
        const response = await fetch('http://10.0.0.155/sensor/binary_sensor.shellymotion2_842E14FFCE72_motion');
        const data = await response.json();
        state_message.value = data.svar.state;
        change_message.value = data.svar.last_changed;
        console.log(data)
      } catch (error) {
          console.error('There was an error fetching the posts ÆÆÆÆ:', error);
      };
    }
    onMounted(responseEntity)
    return {
      state_message,
      change_message
    }
  }}

</script>

<template>
  <h1><('o ')></h1>
  <p>{{ state_message }}</p>
  <p>{{ change_message }}</p>
</template>
