<script>
import { ref, onMounted } from 'vue';
const state_message = ref("State kommer her")
const change_message = ref("Change kommer her")

export default {
  setup() {
    async function responseEntity() {
      try {
        const response = await fetch('http://10.0.0.155/sensor/binary_sensor.motion01_motion');
        const data = await response.json();
        state_message.value = data.svar.state;

        const full_changed = data.svar.last_changed;
        const date_new = new Date(full_changed)
        var date_format = date_new.getDate().toString().padStart(2, "0")+"/"+(date_new.getMonth()+1).toString().padStart(2, "0")+"/"+date_new.getFullYear()+", kl"+date_new.getHours().toString().padStart(2, "0")+":"+date_new.getMinutes().toString().padStart(2, "0")
        console.log(full_changed+ ", " +date_format)
        change_message.value = date_format

        console.log(data.svar)
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
  <h1>-----------------------------------</h1>
  <br>
  <div class="div-box">
    <div v-if="state_message == 'on'">
      <p>There is a motion inside guys!</p>
      <p>Time when last entered:</p>
      <p>{{ change_message }}</p>
    </div>
    <div v-else-if="state_message == 'off'">
      <p>No motion, we chillin' guys!</p>
      <p>Time when last left:</p>
      <p>{{ change_message }}</p>
    </div>
    <div v-else>
      <p>We've lost'em guys :[</p>
    </div>
  </div>
</template>
