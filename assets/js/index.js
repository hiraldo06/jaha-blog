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
    let {token}=JSON.parse(localStorage.getItem('token'));
    console.log(token);
    let headers=new Headers();
    
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
           fetch(`http://68.183.27.173:8080/users/${element.userId}`,{
               method:"GET",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":`Bearer ${token}`
               }
           }).then(res=>res.json())
           .then(res=>{
               document.getElementById('main').innerHTML+=` <div class="post">
               <h3 ><span id="like" class="post-like"><i class="far fa-star"></i></span><a href="#" class="post-title">${element.title}</a></h3>
               <p class="post-body">${element.body.substring(0, 199)}<a href="#">...más</a></p>
               <h5 class="post-footer">
                    <span class="post-by">by: <a class="post-name" href="">${res.name}</a>
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

(function(){
    if(!localStorage.getItem('token')){
        window.location='/public/login.html';
        return;
    }
    header();
    posts();
    document.getElementById('logout').addEventListener('click',logout);
})();

