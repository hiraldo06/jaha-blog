import {headers,url} from '../../helpers/http';

//lista los post
const postList=()=>{
    return fetch(`${url}/post`,{
        method:'GET',
        headers
        })
    .then(res=>res.json())
    .then(res=>{return res});
}

//listar post by user id
const postByUserId=async(userId)=>{
   let result =await fetch(`${url}/post?userId=${userId}`,
        {
            method:"GET",
            headers
        }
    );
    if(!result.ok){
        throw Error("error listando post by id");
    }
   return result.json();
}


//agrega los post
const postAdd=(tags)=>{
    console.log("post add");
    let body=document.getElementById("post-area").value;
    let title=document.getElementById("post-title").value;
    
    console.log("size body: ",String(body).length," title :",title.length," tags : ",tags.length);
    
    if(body.length<100 || title.length<3 ||tags.length<1){
        
        return;
    }
    let data={
        title,
        body,
        tags
    }
    
   return fetch(`${url}/post`,{
        method:"POST",
        body:JSON.stringify(data),
        headers
    }).then(res=>{
        console.log(res.status);
        
        if(res.status===201){
            return res.json()
        }  
        throw new Error("Error al agregar post"); 
    })
}
//le da like a los post
const postLike=(id)=>{
    return fetch(`${url}/post/${id}/like`,{
        method:'PUT',
        headers
        })
    .then(res=>{return res});
}

//quita el like a los post
const postLikeDelete=(id)=>{
    return fetch(`${url}/post/${id}/like`,{
        method:'DELETE',
        headers
        })
    .then(res=>{return res});
}

//get pos by id
const postGetByID=()=>{
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


export {postList,postAdd,postLike,postLikeDelete,postGetByID, postByUserId};;

