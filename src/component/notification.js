import {getUserById} from '../connect/user';


const notification=(data,action,time,connectClass="conectado")=>{
    // let {name}=await getUserById();
     document.getElementById("notification").innerHTML+=`
     <div name="notification-${data.userId}" class="notification flex-row align-i-center j-center">
        <a href="/perfil?id=${data.userId}"  class="notification-item ${connectClass}">${data.userEmail}</a>
        <span id="notification-state" class="notification-item">${action}</span>
    </div>`
    setTimeout(()=>{
        document.getElementsByName(`notification-${data.userId}`).forEach(value=>{
            value.remove();           
        })
    },time);
}


export {notification};