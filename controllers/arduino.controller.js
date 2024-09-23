import { publishMessage } from "../server.js";
export const arduinoPostMessage=async(req,res,next)=>{
    try {
        publishMessage(req.body.topic,req.body.message)
        res.status(200).json({
            status:"message sent to pump"
        })
    } catch (error) {
       console.log(error);
       res.status(200).json({
        status:"error",
        error
       })
    }
}

export const arduinoGetMessage=async(req,res,next)=>{
    try {
    
    } catch (error) {
        
    }
}



