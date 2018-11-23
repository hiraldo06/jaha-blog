let getPostById=()=>{
    let {token}=JSON.parse(localStorage.getItem('token'));
    // let params=new URL("http://127.0.0.1:5500/public/post.html?id=1").searchParams;
    let params = new URLSearchParams(location.search);
    //  console.log(params2.get('id'));
    fetch(`http://68.183.27.173:8080/post/${params.get('id')}`,{
        method:"GET",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
        }
    }).then(res=>res.json())
    .then(res=>{
        

       
        let {body,title,userId}=res;
        getUserById(userId,token).then(result=>{
            document.getElementById('main').innerHTML+=` <div class="post">
            <h3 >${title}</h3>
            <span id="like" class="post-like"><i class="far fa-star"></i>
            </span>
            <h5 class="post-footer">
                 <span class="post-by">by: <a class="post-name" href="/public/perfil.html?id=${userId}">${result.name}</a>
                 </span><span class="like"><i class="fas fa-star"></i></span >
                 <span class="total-like">25</span></h5>
            <p class="post-body">${body}</p>
            
         </div>`;
        })
       getCommentByPostId(params.get('id'));
    }).catch(err=>console.log(err));
}

let getCommentByPostId=(id)=>{
    let {token}=JSON.parse(localStorage.getItem('token'));
    let url=`http://68.183.27.173:8080/post/${id}/comment`;
    console.log(url);
    
    fetch(url,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
        }
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        res.forEach(element => {
            let {body,userId}=element;
            getUserById(userId,token).then(res2=>{
                document.getElementById("comment").innerHTML +=`<div class="comment-text">
                <p>${body}hola</p>
                <span>by: <a href="/public/perfil.html?id=1">${res2.name}</a></span>
            </div>`
            })
           
        });
      
    }).catch(err=>console.log(err));
}

let getUserById=(id,token)=>{
    
    return fetch(`http://68.183.27.173:8080/users/${id}`,{
               method:"GET",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":`Bearer ${token}`
               }
           }).then(res=>res.json())
           .then(response=>{
            return response}).catch(err=>err)       
          
}

let addPost=()=>{
    let params = new URLSearchParams(location.search);
    let body=document.getElementById("post-comment").value;
    if(body.length<=3){
        console.log('error');
        
        document.getElementById("comment-info").style.visibility="visible";
        return;
    }
    document.getElementById("comment-info").style.visibility="hidden";
    const {token}=JSON.parse(localStorage.getItem('token'));
    let data={
        body
    }
    console.log(params.get('id'),data,comment,token);
    
    fetch(`http://68.183.27.173:8080/post/${params.get('id')}/comment`,
        {
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }
    ).then(res=>res.json())
    .then(res=>{
            let {body,userId}=res;
            getUserById(userId,token).then(res2=>{
                document.getElementById("comment").innerHTML +=`
                <div class="comment-text">
                <p>${body}</p>
                <span>by: <a href="/public/perfil.html?id=1">${res2.name}</a></span>
            </div>`
            });
            document.getElementById("post-comment").value="";
        })
    
}

(function(){
    getPostById();
    document.getElementById("btn-comment").addEventListener("click",addPost);
})();

// export default getUserById;