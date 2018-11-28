
import {postList,postAdd,postLike,postLikeDelete}from '../../connect/post/';
import {getFecha} from '../../helpers';




//crea el componente para los post
const postComponent=({body, id, title,userId,
    liked,likes,views,createdAt,userName,tags,comments})=>{
    return `<div class="post">
                <span hidden id="liked-${id}">${liked}</span>
               <div>
                <div class="post-like">
                    <button type="button" id="like-d-${id}" class="like-icon">
                        <i id="like-${id}" class="li ${Boolean(liked)?"fas":"far"} fa-star"></i>
                    </button>
                    <h3>
                        <a href="./post.html?id=${id}" class="post-title">${title}</a>
                    </h3>
                    
                </div>
               </div>
               <p class="post-body">${body.substring(0, 199)}<a href="./post.html?id=${id}"> ...más</a></p>
               <div class="post-footer">
                    <span class="post-fecha">${getFecha(createdAt)}</span>
                    <span class="post-by">by: <a class="post-name" href="/public/perfil.html?id=${userId}">${userName}</a>
                    </span>
                    <spam class="like"><i class="far fa-eye"></i>     ${views}</spam>
                    <span class="like"><i class="fas fa-star"></i>     ${likes}</span >
                    <span class="like"><i class="far fa-comments"></i>     ${comments}</span >
                </div>
                <div class="post-footer">
                    ${tags}
                </div>
            </div>`
}

//llama los connect del post y el componente post
const postsComponentList=()=>{
    document.getElementById("main").innerHTML="";
    let {token}=JSON.parse(localStorage.getItem('token'));
    postList().then(res=>{
        let post= Object.keys(res).map(index=>{
            document.getElementById('main').innerHTML+= postComponent(res[index]);
        });
    })
    .catch(err=>console.log(err,'error')
    )
}

//vista de crear post
const addPostView=()=>{
    let HTML=`
    <div class="login-container post-register .title-login">
        <h3 >Post -ADD </h3>
        <form action="">
            <input id="post-title"class="form-control" type="text" placeholder="TITULO">
            <textarea name="" id="post-area" class="post-textarea" placeholder="Comentarios"></textarea>
            <div class="tags" >
                <input class="form-control" type="text" id="tarea" placeholder="Categoria">
                <button type="button" class="btn btn-primary" id="tags-btn">Agregar</button>
            </div>
            <div class="categorias">
                <ul class="tags-list" id="tags-list">
                </ul>
            </div>
            <div class="action-login">
                <button type="button" class="btn" id="btn-post">Enviar</button>
            </div>
            

        </form>
    </div>`;
    document.getElementById("main").innerHTML="";
     document.getElementById("main").innerHTML=HTML;
}

//function de crear post
const addPostComponent=(tags)=>{
    postAdd(tags).then(res=>{    
        let{id}=res;
        if(id){
           postsComponentList();
        }
    }).catch(err=>console.log(err));
}

// likes
const postLikeView=(id)=>{
    let liked=document.getElementById(`liked-${id}`);
    let element=document.getElementById(`like-d-${id}`);
    
    if(String(liked.innerText)!="true"){
       //add like
       postLike(id).then(res=>{
        if (!res.ok) {
            throw Error("Error al hacer like");
            return;
        }  
        element.innerHTML=`<i id="like-${id}" class='fas fa-star'></i>`;
         liked.innerHTML="true"; 
         console.log("tiene like",liked);
    }).catch(err=>console.log(err));
        
    }else{
       //delete like
       console.log("no tiene like");
       postLikeDelete(id).then(res=>{
           if (!res.ok) {
               throw Error("Error al hacer like");
               return;
           }
           element.innerHTML=`<i id="like-${id}"  class='far fa-star'></i>`;
           liked.innerHTML="false"; 
       });     
    }
}

export {postsComponentList,addPostView,addPostComponent,postLikeView};