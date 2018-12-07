import {commentComponent} from '../component/post/postDetails';
import { notification } from '../component/notification';
const  wsConnect=(token)=> {

    console.log("WS- connect ", token);
        var websocket = new WebSocket(`ws://68.183.27.173:8080/?token=${token}`);
        websocket.onopen = function (evt) {
        console.log(evt)
        };
        websocket.onclose = function (evt) {
        console.log(evt)
        };
        websocket.onerror = function (evt) {
        console.log(evt)
        };

        websocket.onmessage = function(evt) {
            let data= JSON.parse(evt.data);
            console.log("entro al ws",data);
            switch (data.type) {
                case "view-post":
                
                     if(document.getElementById(`ws-view-${data.postId}`)){
                        document.getElementById(`ws-view-${data.postId}`).innerText=data.views;
                     }
                    break;
                case "likes":
                     if(document.getElementById(`ws-like-${data.postId}`)){
                        document.getElementById(`ws-like-${data.postId}`).innerText=data.likes;
                        if(data.likeType==="dislike"){
                            document.getElementById(`like-d-${data.postId}`).innerHTML=`<i id="like-${data.postId}"  class='far fa-star'></i>`;
                            document.getElementById(`liked-${data.postId}`).innerHTML="false";
                        }else{
                            document.getElementById(`like-d-${data.postId}`).innerHTML=`<i id="like-${data.postId}"  class='fas fa-star'></i>`
                            document.getElementById(`liked-${data.postId}`).innerHTML="true"
                        }
                     }
                break;
                case "new-comment":
                     if(document.getElementById(`ws-comment-${data.postId}`)){
                        document.getElementById(`ws-comment-${data.postId}`).innerText=data.comments;
                     }
                    if(location.pathname==="/post"){
                        console.log(" Location : ",location.pathname)
                        document.getElementById("comment").innerHTML +=commentComponent(data);
                    }
                break;
                case "logged":
                    // Object.keys(data.users).map(index=>{
                    //     console.log(data.users[index]);
                    //     document.getElementsByName(`ws-online-${data.users[index].userId}`).forEach(value=>{
                    //         value.classList.replace("ws-offline","ws-online");
                    //         value.innerHTML+=`<i name="ws-icon-online-${data.users[index].userId}}" class="fas fa-plug"></i>`
                    //     });
                    // });
                    
                    localStorage.setItem("userOnline",JSON.stringify(data.users));
                break;
                case "disconnected":
                    if(document.getElementsByName(`ws-online-${data.userId}`)){
                        document.getElementsByName(`ws-online-${data.userId}`).forEach(value=>{
                            value.classList.replace("ws-online","ws-offline");
                        });
                
                    }
                    notification(data,"User Disconnected",5000,"desconectado");
                    break;
                case "user-connected":
                    if(document.getElementsByName(`ws-online-${data.userId}`)){
                        document.getElementsByName(`ws-online-${data.userId}`).forEach(value=>{
                            value.classList.replace("ws-offline","ws-online");
                            // value.innerHTML+=`<i name="ws-icon-online-${data.userId}}" class="fas fa-plug"></i>`
                        });
                    }
                    notification(data,"User Connected",7000);
                    break;
                default:
                    break;
            }
        }
    } 

    export {wsConnect};