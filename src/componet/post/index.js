
import {postList,postAdd}from '../../connect/post/'
import {getUserById} from '../../connect/user';


//crea el componente para los post
let postComponent=({body, id, title,userId},{name})=>{
    return `<div class="post">
               <h3 ><span id="like" class="post-like"><i class="far fa-star"></i>
               </span><a href="./post.html?id=${id}" class="post-title">${title}</a></h3>
               <p class="post-body">${body.substring(0, 199)}<a href="./post.html?id=${id}"> ...más</a></p>
               <h5 class="post-footer">
                    <span class="post-by">by: <a class="post-name" href="/public/perfil.html?id=${userId}">${name}</a>
                    </span><span class="like"><i class="fas fa-star"></i></span >
                    <span class="total-like">25</span></h5>
            </div>`
}

//llama los connect del post y el componente post
let postsComponentList=()=>{
    document.getElementById("main").innerHTML="";
    let {token}=JSON.parse(localStorage.getItem('token'));
    postList().then(res=>{
        res.forEach(element => {
            getUserById(element.userId,token).then(res2=>{
                document.getElementById('main').innerHTML+=postComponent(element,res2);
            })
        });
    })
    .catch(err=>console.log(err,'error')
    )
}

//vista de crear post
let addPostView=()=>{
    document.getElementById("main").innerHTML="";

    const HTML=`
    <div class="login-container post-register .title-login">
        <h3 >Post -ADD </h3>
        <form action="">
            <input id="post-title"class="form-control" type="text" placeholder="TITULO">
            <textarea name="" id="post-area" class="post-textarea" placeholder="Comentarios"></textarea>
            <div class="action-login">
                <button type="button" class="btn" id="btn-post">Enviar</button>
            </div>
        </form>
    </div>`;
    document.getElementById("main").innerHTML=HTML;
}

let addPostComponent=()=>{
    postAdd().then(res=>{
        let{id}=res;
        if(id){
           postsComponentList();
        }
    }).catch(err=>console.log(err));
}

//llama al connect postAdd para crear los post


export {postsComponentList,addPostView,addPostComponent};