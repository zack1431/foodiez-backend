
const jwt = require('jsonwebtoken')
const secret = 'ZALJDFJDS3428#$^#@@XJSDSAJ'
let createToken = async (email) =>{
    let token = await jwt.sign({
        email
    },secret,{expiresIn:'1d'})
    return token;
}

let decodeToken = (token) =>{
    let decode = jwt.decode(token)
    return decode;
}

let validity = async (req,res,next) => {
    if(req.headers.hasOwnProperty('authorization')){
        let token = req.headers.authorization.split(" ")[1];
    let data = decodeToken(token)
    if((Math.round(new Date()/1000)) <= data.exp){
        next();
    }
    else
    {
        res.send({
            status:401,
            message:"Token Expired!!!"
        })
    }
    }
    else
    {
        res.send({
            status:401,
            message:"Token Expired!!!"
        })
    }
    
}
module.exports = {createToken,decodeToken,validity}