import axios from 'axios'
import { publishMessage } from '../server.js'
import UIDGenerator from 'uid-generator';
const uidgen = new UIDGenerator();
export const RegisterPesapalIPN = async(req,res,next)=>{
    
        try {
            const pesapaltoken = await req.pesapalaccesstoken
            const IPNURLREGISTER = 'https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN'
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
            const IPNURL = `https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`
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
        const IPNURL = 'https://pay.pesapal.com/v3/api/URLSetup/GetIpnList'
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
        const uid = await uidgen.generate();
        const pesapaltoken = await req.pesapalaccesstoken
    const SubmitOrderRequestUrl = 'https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest'
    const headers = {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':`${pesapaltoken}`
    }
    const requestPaymentObject ={

        "id": uid,
        "currency": "KES",
        "amount": req.body.price,
        "description": "your testing the api you built",
        "callback_url": "http://127.0.0.1:3000/orderconfirmation",
        "redirect_mode": "",
        "cancellation_url":"http://127.0.0.1:3000/ordercancelled",
        "notification_id": "eaf3fb8c-00a3-4ab9-8fca-dcac8d7fe326",
        "branch": "Water vending ATM",
        "billing_address": {
            "email_address": "myvending@gmail.com",
            "phone_number": req.body.phoneNumber,
            "country_code": "KE",
            "first_name": req.body.name,
            "middle_name": "",
            "last_name": "",
            "line_1": "Water Vending ATM",
            "line_2": req.body.order,
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

