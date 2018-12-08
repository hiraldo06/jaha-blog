import {postsComponentList,
        addPostView,addPostComponent,postsListComponentByTags
    } 
from './component/post';
import {getPostById,addComment} from './component/post/postDetails';
import {createPerfil} from './component/perfil';
// import {logout} from './connect/security';
import {addTags,borrarTags} from './component/post/categorias';
import {getUsers} from './component/user';
import {dandoLike} from './component/post/likes';
import {header} from './component/header';

import {token} from "./helpers/http";
import{wsConnect} from "./helpers/websocket";

let tags=[];


(function(){
    // fetch("http://localhost:3000",{method:"POST",body:JSON.stringify({nombre:"JUAN"})}).catch(e=>{
    //     console.log(err);
        
    // })
   
    
    wsConnect(token);
    console.log("localstorage: ",localStorage.getItem("userOnline"));
    
    header();
    if(location.pathname==="/perfil"){
        createPerfil();
    }
    if(location.pathname==="/post"){
        getPostById();
        document.getElementById("btn-comment").addEventListener("click",addComment);

        document.addEventListener('click',e=>{
            dandoLike(e);
        })
    }

    if(location.pathname==="/usuarios"){
        getUsers();
    }
    console.log(location)

    //listener index
    if(location.pathname==="/"){
        
       
        // document.getElementById('logout').addEventListener('click',logout);
        //eventos al boton de agregar elementos
        document.getElementById('post-add').addEventListener("click",addPostView);
        let params = new URLSearchParams(location.search); 
        if(!params.get("tags")){
            postsComponentList();
        }else{
            postsListComponentByTags(params.get("tags")).catch(err=>{
                console.log(err);
                
            })
        }
        
        document.addEventListener('click',function(e){
            //console.log("estamos aqui",e);
           
            //LISTENER CATEGORIAS POST 
           if(e.target.id==='tags-btn'){
               document.getElementById('tags-btn').addEventListener('click',addTags(tags));
           }
           //borra tags
           if(e.target.nodeName==="SPAN"){
            //    console.log("hola mundo papa",e.target.id);
               borrarTags(e.target.id,tags);
           }

           //crear post 
           if(e.target.id==="btn-post"){
            document.getElementById('btn-post').addEventListener("click",addPostComponent(tags)); 
           }
           dandoLike(e);
        })
       
    }
    //wsConnect(token);
    
})();

