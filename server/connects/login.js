
const fetch=require('node-fetch');

const login=async(data)=>{
    let result=await fetch("http://68.183.27.173:8080/login",{
         method:"POST",
         body:JSON.stringify(data),
         headers:{"Content-Type":'application/json'}
     }).then(res=>res.json())
     .then(res=>{
        return res; // console.log(res);
     }).catch(err=>{
         return {
             err,
             status:500
         }
     })
     return result;
 }

module.exports={
    login
}