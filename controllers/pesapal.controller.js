import axios from 'axios'
import { publishMessage } from '../server.js'
export const RegisterPesapalIPN = async(req,res,next)=>{
    
        try {
            const pesapaltoken = await req.pesapalaccesstoken
            const IPNURLREGISTER = 'https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN'
            const headers = {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':`${pesapaltoken}`
            }
            const requestObject = {
                url:`${process.env.SERVER_URL}/api/pesapal/pesapalipn`,
                ipn_notification_type:"POST"
            }
            const response = await axios.post(IPNURLREGISTER,requestObject,{headers})
    
           res.status(200).json({
            status:"success",
            message:response.data
    
           })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:"fail",
                message:error
        
               })        
        }
    
    
}
export const pesapalIPN = async(req,res,next)=>{
        try {
            const orderTrackingId = req.body.OrderTrackingId;
            const pesapaltoken = await req.pesapalaccesstoken
            const IPNURL = `https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`
            const headers = {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':`${pesapaltoken}`
            }
            const response = await axios.get(IPNURL,{headers})
            console.log(response.data)
            const statusCodeOfPayment = response.data.status_code;
            const paidAmount = response.data.amount
            if(statusCodeOfPayment === 1){
                const convertToLitres = paidAmount * 2;
                const messageToSendToServer = `dispense:${convertToLitres}`
                publishMessage('esp32/pumpstatus',messageToSendToServer)
            }
            
            
           res.status(200).json({
            status:"success",
            message:response.data
    
           })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:"failed",
                error
            })
        }

    } 


export const getRegisteredIpns = async(req,res,next)=>{
    try {
        const pesapaltoken = await req.pesapalaccesstoken
        const IPNURL = 'https://cybqa.pesapal.com/pesapalv3/api/URLSetup/GetIpnList'
        const headers = {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':`${pesapaltoken}`
        }
        const response = await axios.get(IPNURL,{headers})
        console.log(response)
       res.status(200).json({
        status:"success",
        message:response.data

       })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:"failed",
            error
        })
    }
}
export const InitiatePayment = async(req,res,next)=>{
    try {
        const pesapaltoken = await req.pesapalaccesstoken
    const SubmitOrderRequestUrl = 'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest'
    const headers = {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':`${pesapaltoken}`
    }
    const requestPaymentObject ={
        "id": "AA1122-3344ZZ667e47",
        "currency": "KES",
        "amount": 1,
        "description": "your testing the api you built",
        "callback_url": "https://www.google.com",
        "redirect_mode": "",
        "notification_id": "ebbbfbd0-242a-4c61-8af1-dcb83d26761c",
        "branch": "Store Name - HQ",
        "billing_address": {
            "email_address": "john.doe@example.com",
            "phone_number": "0728440683",
            "country_code": "KE",
            "first_name": "John",
            "middle_name": "",
            "last_name": "Doe",
            "line_1": "chege the enginneer 😃",
            "line_2": "pay",
            "city": "",
            "state": "",
            "postal_code": "",
            "zip_code": ""
        }

       
    }  
    const response = await axios.post(SubmitOrderRequestUrl,requestPaymentObject,{headers})  
    res.status(200).json({
        message:response.data
    })
        
    } catch (error) {
        res.status(500).json({
            error
        })
        
    }
    
}

