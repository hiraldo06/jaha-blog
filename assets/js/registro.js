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
    fetch('http://68.183.27.173:8080/register',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'},
        
    }).
    then(res=>res.json())
    .then(res=>{
        if(res.id){
            window.location='/public/login.html';   
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
})();