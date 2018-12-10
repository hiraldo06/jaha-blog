const header=()=>{
    
    const navbar=`<div class="nav-items logo">
    <a class="item" href="/">JAHA-BLOG</a>
    <a class="item" href="https://github.com/hiraldo06" target="_blank"><i class="fab fa-github fa-lg"></i></a>
</div>
<div class="nav-items autenticado">
    <a class="item" href="/usuarios"  id='usuarios'>Usuarios</a>
    <a class="item" href="/perfil?id=me"  id='name'></a>
    <a class="item" href="/logout" >Logout</a>
</div>`;
/* <label id="logout" class="item" >Logout</label> en caso de arreglar el logout hector api */
document.getElementById("nav-bar").innerHTML=navbar

    if(localStorage.getItem('token')===undefined ||localStorage.getItem('token')===null){
        window.location='/login';
        return;
    }
    let {id,name, email,token}=JSON.parse(localStorage.getItem('token'));
    
    document.getElementById("name").innerText=name;
   
}

export {header}
