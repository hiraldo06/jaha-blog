// const url="http://localhost:8080";
const url=`http://68.183.27.173:8080`;
let registrar=()=>{
    let name=document.getElementById("nombre").value;
    let email=document.getElementById("email").value;
    let password=document.getElementById("contrasena").value;
    let re_password=document.getElementById("re-contrasena").value;

    if(password!=re_password){
        alert("Contraseñas son diferentes");
        return;
    }

    let data={
        name,
        email,
        password
    } 

    console.log(data);
    
    fetch(`${url}/register`,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'},
        
    }).
    then(res=>res.json())
    .then(res=>{
        console.log("res", res);
        
        if(res.id){
            window.location='/sign-in';   
        }
        if(res.message){
            if(res.message.search("Duplicate")!= -1){
                alert("Usuario Duplicado");
            }
        }
       
    })
    .catch(err=>console.log(err));
    
    
}


(function(){
    document.getElementById("btn").addEventListener('click',registrar);
    document.getElementById('re-contrasena').addEventListener("keypress",(e)=>{
        if(e.keyCode===13){
            document.getElementById('btn').focus();
        }
    })
})();