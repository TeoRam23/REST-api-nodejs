<template>
    <div id="div-motion">
        <img src="/public/motion.png" alt="Motion Guy" id="motion-guy">
        <div v-if="state_message == 'off'">
        <p>No motion, we chillin' guys!</p>
        <p>Last exit:</p>
        <p>{{ change_message }}</p>
        </div>
        <div v-else-if="state_message == 'on'">
        <p>Motion detected</p>
        <p>Last entered:</p>
        <p>{{ change_message }}</p>
        </div>
        <div v-else>
        <p>Motion detector is not connected</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
    data() {
        const state_message = ref("State kommer her")
        const change_message = ref("Change kommer her")

        async function responseEntity() {
        try {
            const response = await fetch('http://10.0.0.155/sensor/binary_sensor.motion01_motion');
            const data = await response.json();
            state_message.value = data.svar.state;
            state_message.value = "on";

            const full_changed = data.svar.last_changed;
            const date_new = new Date(full_changed)
            var date_format = date_new.getDate().toString().padStart(2, "0")+"/"+(date_new.getMonth()+1).toString().padStart(2, "0")+"/"+date_new.getFullYear()+", kl"+date_new.getHours().toString().padStart(2, "0")+":"+date_new.getMinutes().toString().padStart(2, "0")
            change_message.value = date_format;
            
            if (state_message.value == "off") {
            document.getElementById("div-motion").style.backgroundColor = "rgb(37, 195, 50)"
            } else if (state_message.value == "on") {
            document.getElementById("div-motion").style.backgroundColor = "rgb(205, 0, 0)"

            document.getElementById("motion-guy").animate([
                // key frames
                { transform: "scaleX(1)", },
                { transform: "scaleX(-1)" },
                { transform: "scaleX(-1)" },
                ], {
                // sync options
                duration: 1000,
                // easing: 'steps(1, jump-end)',
                iterations: Infinity
            });
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
    }
}
</script>

<style>
#div-motion {
  color: rgb(255, 255, 255);
  font-weight: 10;
  background-color: rgb(28, 142, 218);
  height: 250px;
  width: 250px;
  border-radius: 25px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}

#motion-guy {
  height: 60%;
  animation-timing-function: steps(1, 'jump-end');
}
</style>