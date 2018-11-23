// import getUserById from './post';

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

let createPerfil=()=>{
    let params=new URLSearchParams(location.search).get('id');
    console.log(location);
    let {token}=JSON.parse(localStorage.getItem('token'));
    getUserById(params,token).then(res=>{
        let {name,email}=res;
        document.getElementById('perfil').innerHTML +=` 
        <figure class="perfil-avatar">
            <img src="/assets/img/avatar.png" alt="${name}">
            <figcaption>${name}</figcaption>
        </figure>
        <div class="perfil-description flex-row align-i-center">
            <h4>Email:</h4> <h5>${email}</h5>
        </div>`
    })
    
}


(function(){
    createPerfil();
})();