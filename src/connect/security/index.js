import {url}from '../../helpers/http';
const logout=()=>{
    fetch(`${url}/logout`,{
        method:'DELETE',
        headers:{'Content-Type':"application/json"}
    }).then(res=>{
        
        window.location='/public/login.html'
    }).catch(err=>{

    });
    localStorage.removeItem('token')
}

export {logout};