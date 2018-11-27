import {getUserById} from '../../connect/user';
import {getFecha} from '../../helpers';

let perfilComponent=({name,email,createdAt,posts})=>{
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
let createPerfil=()=>{
    let userId=new URLSearchParams(location.search).get('id');
    console.log(location);
    let {token}=JSON.parse(localStorage.getItem('token'));
    getUserById(userId,token).then(res=>{
        document.getElementById('perfil').innerHTML +=perfilComponent(res);
    })
    
}

export {createPerfil};