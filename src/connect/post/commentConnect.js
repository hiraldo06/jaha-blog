import{url,headers}from "../../helpers/http";

//busca los comment by post id
const commentGetByPostId=(id)=>{
    return fetch(`${url}/post/${id}/comment`,{
        method:"GET",
        headers
    })
    .then(res=>{
        if(res.ok){
           return res.json();
        }
        throw Error("fallo el connect del comment by post ID");
    });
    
}

const commentAdd=(params,data)=>{
    return fetch(`${url}/post/${params}/comment`,
            {
                method:"POST",
                body:JSON.stringify(data),
                headers
            }
        ).then(res=>{
            if(res.ok){
                return res.json();
            }
            throw Error("Error crear post")
        });
}

export {commentGetByPostId,commentAdd};