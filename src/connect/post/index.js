let postList=()=>{
    let {token}=JSON.parse(localStorage.getItem('token'));
    console.log(token);

    return fetch('http://68.183.27.173:8080/post',{
        method:'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
            }
        })
    .then(res=>res.json())
    .then(res=>{return res});
}




let postAdd=()=>{
    const {token}=JSON.parse(localStorage.getItem("token"));
    let body=document.getElementById("post-area").value;
    let title=document.getElementById("post-title").value;
    let data={
        title,
        body
    }
    console.log(token);
    
    
   return fetch("http://68.183.27.173:8080/post",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
        }
    }).then(res=>res.json())
    .then(res=>{
        return res;
    })
}

export {postList,postAdd};

