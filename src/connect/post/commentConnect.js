
let commentGetByPostId=(id,token)=>{
    //     let {token}=JSON.parse(localStorage.getItem('token'));
    let url=`http://68.183.27.173:8080/post/${id}/comment`;
   
    console.log("id comment:",id);
    
    return fetch(url,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
        }
    })
    .then(res=>{
        if(res.ok){
           return res.json();
        }
        throw Error("fallo el connect del comment by post ID");
    });
    
}

let commentAdd=(params,data,token)=>{

    return fetch(`http://68.183.27.173:8080/post/${params}/comment`,
            {
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            }
        ).then(res=>{
            if(res.ok){
                return res.json();
            }
            throw Error("Error crear post")
        });
}

export {commentGetByPostId,commentAdd};