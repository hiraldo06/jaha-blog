import {postsComponentList,
        addPostView,addPostComponent,postLikeView
    } 
from './component/post';
import {getPostById,addComment} from './component/post/postDetails';
import {createPerfil} from './component/perfil';
import {logout} from './connect/security';
import {addTags,borrarTags} from './component/post/categorias';
import {getUsers} from './component/user';

let tags=[];
let vistaList=true;

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
    if(location.pathname==="/public/post.html"){
        getPostById();
        document.getElementById("btn-comment").addEventListener("click",addComment);
    }

    if(location.pathname==="/public/usuarios.html"){
        getUsers();
    }
    console.log(location)

    //listener index
    if(location.pathname==="/public/index.html"){
        
        document.getElementById('logout').addEventListener('click',logout);
        //eventos al boton de agregar elementos
        document.getElementById('post-add').addEventListener("click",addPostView);
        postsComponentList();
        document.addEventListener('click',function(e){
            console.log("estamos aqui",e);
            
            //LISTENER CATEGORIAS POST 
           if(e.target.id==='tags-btn'){
               document.getElementById('tags-btn').addEventListener('click',addTags(tags));
           }
           //borra tags
           if(e.target.nodeName==="SPAN"){
               console.log("hola mundo papa",e.target.id);
               borrarTags(e.target.id,tags);
           }

           //crear post 
           if(e.target.id==="btn-post"){
            document.getElementById('btn-post').addEventListener("click",addPostComponent(tags)); 
           }
           //dando like
           if(e.target.nodeName==="BUTTON"){
                let result= String(e.target.id).split("-");
               
                if(result[0]==="like"){
                    postLikeView(result[2]);
                    console.log(result[2]);
                    
                }
           }

        })
       
    }
    
    
})();

