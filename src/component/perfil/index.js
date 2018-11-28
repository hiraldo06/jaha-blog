import {getUserById} from '../../connect/user';
import {postByUserId} from '../../connect/post';
import {getFecha} from '../../helpers';
import {token} from '../../helpers/http';

const perfilComponent=({name,email,createdAt,posts})=>{
    return ` 
    <figure class="perfil-avatar">
        <img src="/assets/img/avatar.png" alt="${name}">
        <figcaption>${name}</figcaption>
        <figcaption>Fecha Creado : ${getFecha(createdAt)}</figcaption>
    </figure>
    <div class="perfil-description flex-row align-i-center">
        <h4>Total de Post:</h4> <h5>${posts}</h5>
    </div>
    <div class="perfil-description flex-row align-i-center">
        <h4>Email:</h4> <h5>${email}</h5>
    </div>
    `
}

const perfilComponentPostPublic=({id,title,likes,views,comments,tags})=>{
   return `<div class="comment-text">
                <a href="/public/post.html?id=${id}"><h3>${title}</h3></a>
                <div class="">
                    <span><i class="fas fa-star"></i>  ${likes}</span>
                    <span><i class="far fa-eye"></i>   ${views}</span>
                    <span><i class="far fa-comments"></i>   ${comments}</span>
                    <spa>${tags}</span>
                </div>
            </div>`
}
const createPerfil=()=>{
    let userId=new URLSearchParams(location.search).get('id');
    console.log("user id: ",userId);
    
    getUserById(userId,token).then(res=>{

        document.getElementById('perfil').innerHTML =perfilComponent(res);
        return res;
    }).then(res=>{
        console.log(res);
        
        postByUserId(res.id).then(res2=>{
            Object.keys(res2).map(index=>{
                document.getElementById('perfil-post').innerHTML+=perfilComponentPostPublic(res2[index]);
            });
        });
    })
}

export {createPerfil};