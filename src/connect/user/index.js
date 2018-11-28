import {headers,url} from '../../helpers/http';

const getUserById=(userId)=>{
    return fetch(`${url}/users/${userId}`,{
        method:"GET",
        headers
    }).then(res=>res.json())
    .then(res=>{return res})
}

const usersGet=()=>{
    return fetch(`${url}/users`,{
        method:"GET",
        headers
    }).then(res=>{
        if(res.ok){
            return res.json();
        }
        throw Error("error en el getUsers");
    })
}

export {getUserById,usersGet};