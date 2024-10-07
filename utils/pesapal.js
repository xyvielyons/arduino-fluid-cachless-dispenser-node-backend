import axios from "axios"
export const authorization = async(req,res,next)=>{
    try {
       const Request ={
           consumer_key:process.env.PESAPAL_CONSUMER_KEY,
           consumer_secret:process.env.PESAPAL_CONSUMER_SECRET
       }
       const headers = {
           'Accept':'application/json',
           'Content-Type':'application/json'
       }
       const apiUrl = 'https://pay.pesapal.com/v3/api/Auth/RequestToken'
       const resp = await axios.post(apiUrl,Request,{headers})
       
       req.pesapalaccesstoken = resp.data.token
       console.log("pesapal access token",resp.data.token)
       next()
   
   
   
    } catch (error) {
       res.status(500).json({
           status:"An error was encountered",
           error
   
   
       })
       
    }
   }