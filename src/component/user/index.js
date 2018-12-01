import {usersGet} from '../../connect/user';
import {getFechaMoment} from '../../helpers';

const usersComponent=({name,createdAt,email,posts,id})=>{
    return `
    <div class="usuarios-container flex-row j-center f-wrap">
        <a href="/public/perfil.html?id=${id}">
            <figure class="usuarios-figure" >
                <img src="/assets/img/avatar.png" alt="${name}">
                <figcaption>${name}</figcaption>
                <figcaption>${getFechaMoment(createdAt)} </figcaption>
            </figure>
        </a>
        <div class="description flex-column">
            <h3>Description</h3>
            <span class="c-violet"><i class="far fa-envelope c-green"></i>  Email : ${email} </span>
            <span class="c-violet"><i class="far fa-newspaper c-blue"></i>  Post Publicado : ${posts} </span>
        </div>
    </div>`
}

const getUsers=()=>{
    usersGet().then(res=>{
        Object.keys(res).map(index=>{
            document.getElementById("usuarios-container").innerHTML+=usersComponent(res[index]);
        });
    });
}

export {getUsers};