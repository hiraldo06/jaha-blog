import {headers,url} from '../../helpers/http';
let postList=()=>{
    let {token}=JSON.parse(localStorage.getItem('token'));
    console.log(token);

    return fetch(`${url}/post`,{
        method:'GET',
        headers
        })
    .then(res=>res.json())
    .then(res=>{return res});
}




let postAdd=(tags)=>{
   
    let body=document.getElementById("post-area").value;
    let title=document.getElementById("post-title").value;
    console.log("post add");
    
    if(body.lenght<20||title.lenght<3||tags.lenght<1){
        
        return;
    }
    let data={
        title,
        body,
        tags
    }
    console.log(token, "data:", data);
    
    
   return fetch(`${url}/post`,{
        method:"POST",
        body:JSON.stringify(datas),
        headers
    }).then(res=>res.json())
    .then(res=>{
        return res;
    })
}
//le da like a los post
let postLike=(id)=>{
    return fetch(`${url}/post/${id}/like`,{
        method:'PUT',
        headers
        })
    .then(res=>{return res});
}

//quita el like a los post
let postLikeDelete=(id)=>{
    return fetch(`${url}/post/${id}/like`,{
        method:'DELETE',
        headers
        })
    .then(res=>{return res});
}

//get pos by id
let postGetByID=()=>{
    let params = new URLSearchParams(location.search);
    return fetch(`${url}/post/${params.get('id')}`,{
        method:"GET",
        headers
    }).then(res=>{
        if(res.ok){
            console.log(res);
            return res.json();
        }
        throw Error("Post by id error");
    });
    
    
}


export {postList,postAdd,postLike,postLikeDelete,postGetByID};;

