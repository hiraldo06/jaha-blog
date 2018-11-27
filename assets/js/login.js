const url="http://localhost:8080";
let login=()=>{
    let email = document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let data={
        email,
        password
    }
    fetch(`${url}/login`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{"Content-Type":'application/json'}
    })
    .then(res=>res.json())
    .then(
        res=>{
            if(typeof res.estatus!= 'undefined'){
                document.getElementById("error-login").style.display='block';
            }else{
                document.getElementById("error-login").style.display='none';
                localStorage.setItem('token',JSON.stringify(res));
                window.location='/public/index.html';
            }
            console.log(res);
            
        })
    .catch(err=>console.log(err));
}
(function(){
    document.getElementById('btn').addEventListener("click",login);
})();