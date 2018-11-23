let getUserById=(userId,token)=>{
    return fetch(`http://68.183.27.173:8080/users/${userId}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }).then(res=>res.json())
    .then(res=>{return res})
}

export {getUserById};