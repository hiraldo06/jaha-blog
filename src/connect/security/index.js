let logout=()=>{
    fetch('http://68.183.27.173:8080/logout',{
        method:'DELETE',
        headers:{'Content-Type':"application/json"}
    }).then(res=>{
        
        window.location='/public/login.html'
    }).catch(err=>{

    });
    localStorage.removeItem('token')
}

export {logout};