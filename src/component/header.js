const header=()=>{
    
    const navbar=`<div class="nav-items logo">
    <a class="item" href="/">JAHA-BLOG</a>
</div>
<div class="nav-items autenticado">
    <a class="item" href="/usuarios"  id='usuarios'>Usuarios</a>
    <a class="item" href="/perfil?id=me"  id='name'></a>
    <label id="logout" class="item" >Logout</label>
</div>`;
document.getElementById("nav-bar").innerHTML=navbar

    if(localStorage.getItem('token')===undefined ||localStorage.getItem('token')===null){
        window.location='/login';
        return;
    }
    let {id,name, email,token}=JSON.parse(localStorage.getItem('token'));
    
    document.getElementById("name").innerText=name;
   
}

export {header}
