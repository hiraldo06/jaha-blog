import {postsComponentList,
        addPostView,addPostComponent
    } 
from './componet/post';
import {createPerfil} from './componet/perfil';
import {logout} from './connect/security';
let header=()=>{
    let {id,name, email,token}=JSON.parse(localStorage.getItem('token'));
    console.log(name,'nombre index');
    document.getElementById("name").innerText=name;
}

(function(){
    if(!localStorage.getItem('token')){
        window.location='/public/login.html';
        return;
    }
    header();
    if(location.pathname==="/public/perfil.html"){
        createPerfil();
        
    }
    console.log(location)
    if(location.pathname==="/public/index.html"){
        postsComponentList();
        document.getElementById('logout').addEventListener('click',logout);
        document.getElementById('post-add').addEventListener("click",addPostView);
        
        document.addEventListener("click",()=>{
            let btnPost=document.getElementById('btn-post')
            if(btnPost!=null){
                document.getElementById('btn-post').addEventListener("click",addPostComponent);
            }
        });
    }
    
    
})();

