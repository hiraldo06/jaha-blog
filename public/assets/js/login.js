// const url="http://localhost:8080";
const url=location.origin;

let login=()=>{
    let email = document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let data={
        email,
        password
    }
    console.log(location,data)

    fetch(`${url}/sign-in`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'}
    })
    .then(res=>res.json())
    .then(
        res=>{
            if(typeof res.estatus!= 'undefined'){
                document.getElementById("error-login").style.display='block';
            }else{
                document.getElementById("error-login").style.display='none';
                localStorage.setItem('token',JSON.stringify(res));
                window.location='/';
            }
            console.log(res);
            
        })
    .catch(err=>console.log(err));
}
(function(){
    document.getElementById('btn').addEventListener("click",login);
})();