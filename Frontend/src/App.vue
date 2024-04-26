<script>
import { ref, onMounted } from 'vue';
export default {
  setup() {
    const state_message = ref("State kommer her")
    const change_message = ref("Change kommer her")

    async function responseEntity() {
      try {
        const response = await fetch('http://10.0.0.155/sensor/binary_sensor.motion01_motion');
        const data = await response.json();
        state_message.value = data.svar.state;

        const full_changed = data.svar.last_changed;
        const date_new = new Date(full_changed)
        var date_format = date_new.getDate().toString().padStart(2, "0")+"/"+(date_new.getMonth()+1).toString().padStart(2, "0")+"/"+date_new.getFullYear()+", kl"+date_new.getHours().toString().padStart(2, "0")+":"+date_new.getMinutes().toString().padStart(2, "0")
        change_message.value = date_format;
        
        if (state_message.value == "off") {
          document.getElementById("div-motion").style.backgroundColor = "rgb(37, 195, 50)"
        } else if (state_message.value == "on") {
          document.getElementById("div-motion").style.backgroundColor = "rgb(205, 0, 0)"
        } else {
          document.getElementById("div-motion").style.backgroundColor = "rgb(255, 234, 0)"

        }

        // console.log(full_changed+ ", " +date_format)
        // console.log(data.svar)
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
  <div id="div-motion">
    <img src="/public/motion.png" alt="Motion Guy" id="motion-guy">
    <div v-if="state_message == 'off'">
      <p>No motion, we chillin' guys!</p>
      <p>Time when last exited:</p>
      <p>{{ change_message }}</p>
    </div>
    <div v-else-if="state_message == 'on'">
      <p>Motion detected</p>
      <p>Time when last entered:</p>
      <p>{{ change_message }}</p>
    </div>
    <div v-else>
      <p>Motion detector is not connected</p>
    </div>
  </div>
</template>
