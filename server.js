import express from "express";
import dotenv from 'dotenv';
import arduinoRoutes from './routes/arduino.route.js'
import pesapalRoutes from './routes/pesapal.route.js'
import bodyParser from 'body-parser'
import mqtt from "mqtt"
import mongoose from "mongoose";
import cors from 'cors'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const client = mqtt.connect({
host:'broker.hivemq.com',
port:1883,
protocol:'mqtt',
clientId,
connectTimeout:4000,
username:'xyvielyons',
password:'XyvieLyons7@gmail.com',
reconnectPeriod:2500
})



dotenv.config()

const app = express();
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors({
    origin:'*'
}))
process.on('uncaughtException',(err)=>{
    console.log(err.message)
    console.log("Unhandled exception occured! shutting down")
   
        process.exit(1);
   
    
})

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_CONN_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>app.listen(PORT,()=>{console.log("server has just started")}))



app.use('/api/arduino',arduinoRoutes)
app.use('/api/pesapal',pesapalRoutes)



client.on("connect",()=>{
    console.log('connected')
})
client.on('offline', () => {
    console.log('Client is offline');
  });
  
client.on('reconnect', () => {
console.log('Reconnecting to MQTT broker');
});
  
client.on('end', () => { 
console.log('Connection to MQTT broker ended');
});

client.on('error',(err)=>{
    console.log(err)

})

export const publishMessage = (topic,message)=>{
    client.publish(topic,message)
}

//subscribing for a message from the broker
const topic2 = 'esp32/test1'

client.subscribe(topic2,(err)=>{
    if(err){
        console.log('failed to subcribe to topic')
    }
    console.log("subscribed to topic",topic2)
})

client.on("message",(topic,message)=>{
    console.log(`message receivedon topic:${topic}`)
    console.log(`message content:${message}`)
})
