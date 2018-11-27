import {token,params} from '../../helpers/http';
import {postGetByID} from '../../connect/post';
import {commentGetByPostId,commentAdd} from '../../connect/post/commentConnect';
import {getUserById} from '../../connect/user';
import {getFecha} from '../../helpers';

let postComponent=({title,body,userId,liked,id,createdAt,userName,likes,views},{name})=>{

    return ` 
        <div class="post">
        <div>
            <div class="post-like">
                <div id="like-d-${id}" class="like-icon">
                    <i id="like-${id}" class="li ${Boolean(liked)?"fas":"far"} fa-star"></i>
                </div>
                <h3 class="post-title no-pointer">
                    ${title}
                </h3>
            </div>
       </div>
       <div class="post-footer">
            <span class="post-fecha">${getFecha(createdAt)}</span>
            <span class="post-by">by: <a class="post-name" href="/public/perfil.html?id=${userId}">${userName}</a>
            </span>
            <spam class="like"><i class="far fa-eye"></i></spam>
            <span class="total">${views}</span>
            <span class="like"><i class="fas fa-star"></i></span >
            <span class="total">${likes}</span>
        </div>
            <p class="post-body">${body}</p>
            
         </div>`;
}

let commentComponent=({body},{name})=>{
    return `<div class="comment-text">
                <p>${body}</p>
                <span>by: <a href="/public/perfil.html?id=1">${name}</a></span>
            </div>`
}

let getPostById=()=>{
        //get post by Id
        postGetByID().then(res=>{
            getUserById(res.userId,token).then(res2=>{
                document.getElementById('main').innerHTML=postComponent(res,res2);
            }).catch(err=>console.log(err));
            getCommentByPostId(params.get('id'));
        }).catch(err=>console.log(err));
       
    //     let {body,title,userId}=res;
    //     getUserById(userId,token).then(result=>{
    //         document.getElementById('main').innerHTML+=` <div class="post">
    //         <h3 >${title}</h3>
    //         <span id="like" class="post-like"><i class="far fa-star"></i>
    //         </span>
    //         <h5 class="post-footer">
    //              <span class="post-by">by: <a class="post-name" href="/public/perfil.html?id=${userId}">${result.name}</a>
    //              </span><span class="like"><i class="fas fa-star"></i></span >
    //              <span class="total-like">25</span></h5>
    //         <p class="post-body">${body}</p>
            
    //      </div>`;
    //     })
    //    getCommentByPostId(params.get('id'));
    // }).catch(err=>console.log(err));
}

let getCommentByPostId=(id)=>{
    console.log("comentarios");
    commentGetByPostId(id,token).then(res=>{
        console.log("comentarios res:",res);
        res.forEach(element => {
            getUserById(element.userId,token).then(res2=>{
                console.log("comentarios");
                
                document.getElementById("comment").innerHTML +=commentComponent(element,res2);
            }).catch(err=>console.log(err));
        });
    }).catch(err=>console.log(err));
//         console.log(res);
//         res.forEach(element => {
//             let {body,userId}=element;
//             getUserById(userId,token).then(res2=>{
//                 document.getElementById("comment").innerHTML +=`<div class="comment-text">
//                 <p>${body}hola</p>
//                 <span>by: <a href="/public/perfil.html?id=1">${res2.name}</a></span>
//             </div>`
//             })
           
//         });
      
//     }).catch(err=>console.log(err));
}



let addComment=()=>{
    let params = new URLSearchParams(location.search);
    let body=document.getElementById("post-comment").value;
    if(body.length<=3){
        console.log('error');
        
        document.getElementById("comment-info").style.visibility="visible";
        return;
    }
    document.getElementById("comment-info").style.visibility="hidden";
    let data={
        body
    }
    
    commentAdd(params.get('id'),data,token).then(res=>{  
            getUserById(res.userId,token).then(res2=>{
                document.getElementById("comment").innerHTML +=commentComponent(res,res2);
            });
            document.getElementById("post-comment").value="";
        })
    
}

export {getPostById,addComment};
