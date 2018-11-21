let header=()=>{
    let {id,name, email,token}=JSON.parse(localStorage.getItem('token'));
    console.log(name,'nombre');
    document.getElementById("name").innerText=name;
}

let logout=()=>{
    fetch('http://68.183.27.173:8080/logout',{
        method:'DELETE',
        headers:{'Content-Type':"application/json"}
    }).then(res=>{
        
        window.location='/public/login.html'
    }).catch(err=>{

    });
    localStorage.removeItem('token')
}



let posts=()=>{
    document.getElementById("main").innerHTML="";
    let {token}=JSON.parse(localStorage.getItem('token'));
    console.log(token);
    
    fetch('http://68.183.27.173:8080/post',{
        method:'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
            }
        })
    .then(res=>res.json())
    .then(res=>{
       res.forEach(element => {
           let {body, id, title,userId}=element;
           fetch(`http://68.183.27.173:8080/users/${userId}`,{
               method:"GET",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":`Bearer ${token}`
               }
           }).then(res=>res.json())
           .then(res=>{
               document.getElementById('main').innerHTML+=` <div class="post">
               <h3 ><span id="like" class="post-like"><i class="far fa-star"></i>
               </span><a href="./post.html?id=${id}" class="post-title">${title}</a></h3>
               <p class="post-body">${body.substring(0, 199)}<a href="./post.html?id=${id}"> ...más</a></p>
               <h5 class="post-footer">
                    <span class="post-by">by: <a class="post-name" href="/public/perfil.html?id=${userId}">${res.name}</a>
                    </span><span class="like"><i class="fas fa-star"></i></span >
                    <span class="total-like">25</span></h5>
            </div>`;
               
           })
         
        console.log(name);
       });
    })
    .catch(err=>console.log(err,'error')
    )
}

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
let addPost=()=>{
    const {token}=JSON.parse(localStorage.getItem("token"));
    let body=document.getElementById("post-area").value;
    let title=document.getElementById("post-title").value;
    let data={
        title,
        body
    }
    console.log(token);
    
    
    fetch("http://68.183.27.173:8080/post",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
        }
    }).then(res=>res.json())
    .then(res=>{
        let{id}=res;
        if(id){
            posts();
        }
    })
}


(function(){
    if(!localStorage.getItem('token')){
        window.location='/public/login.html';
        return;
    }
    header();
    posts();
    document.getElementById('logout').addEventListener('click',logout);
    document.getElementById('post-add').addEventListener("click",addPostView);
    
    document.addEventListener("click",()=>{
        let btnPost=document.getElementById('btn-post')
        if(btnPost!=null){
            document.getElementById('btn-post').addEventListener("click",addPost);
        }
    });
    
    
})();

