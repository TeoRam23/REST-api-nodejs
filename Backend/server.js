const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 80
app.use(cors())

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhNmQ4ZDc2MWU3YjU0MDViODdiOGY2NGM5ZDc4MDY2NiIsImlhdCI6MTcxMzMzNzUxMSwiZXhwIjoyMDI4Njk3NTExfQ.ZlWZnPHJl8OC1gprzCbWASG5E0ORMH523rKObldaUPU'

api_status()
async function api_status() {
    try {
        const response = await fetch('http://10.100.0.13:8123/api/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log("APIet sin status er: " + response.status)
    } catch {
        console.error("Error, ÆÆÆ!: ")
    }
}


async function get_entity(entity_id) {
    try {
        const response = await fetch('http://10.100.0.13:8123/api/states/' + entity_id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        const data = await response.json()
        return data
    } catch {
        console.error("Error, ÆÆÆ!: ")
    }
}

// api_status()

// get_entity('binary_sensor.motion01_motion')

app.get('/sensor/:reqEntityId', async function (req, res){
    var data = await get_entity(req.params.reqEntityId)
    res.json({svar: data})
})


app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
  ); 