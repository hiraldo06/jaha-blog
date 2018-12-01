import {params} from '../../helpers/http';
import {postGetByID} from '../../connect/post';
import {commentGetByPostId,commentAdd} from '../../connect/post/commentConnect';
import {getUserById} from '../../connect/user';
import {getFechaMoment} from '../../helpers';

const postComponent=({title,body,userId,liked,id,createdAt,userName,likes,views,comments})=>{
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
            <span class="post-fecha">${getFechaMoment(createdAt)}</span>
            <span class="post-by">by: <a class="post-name" href="/public/perfil.html?id=${userId}">${userName}</a>
            </span>
            <spam class="like"><i class="far fa-eye"></i>      ${views}</spam>
            <span class="like"><i class="fas fa-star"></i>     ${likes}</span>
            <span><i class="far fa-comments"></i>   ${comments}</span>
        </div>
            <p class="post-body">${body}</p>
            
         </div>`;
}

const commentComponent=({body,userName})=>{
    return `<div class="comment-text">
                <p>${body}</p>
                <span>by: <a href="/public/perfil.html?id=1">${userName}</a></span>
            </div>`
}

const getPostById=()=>{
        //get post by Id
        postGetByID().then(res=>{
            getUserById(res.userId).then(res2=>{
                document.getElementById('main').innerHTML=postComponent(res,res2);
            }).catch(err=>console.log(err));
            getCommentByPostId(params.get('id'));
        }).catch(err=>console.log(err));
}

const getCommentByPostId=(id)=>{
    console.log("comentarios");
    commentGetByPostId(id).then(res=>{
        console.log("comentarios res:",res);
        let obj=Object.keys(res).map(index=>{
            document.getElementById("comment").innerHTML+= commentComponent(res[index]);
        });
        console.log(obj);
    }).catch(err=>console.log(err));
}



const addComment=()=>{
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
    commentAdd(params.get('id'),data).then(res=>{  
            getUserById(res.userId).then(res2=>{
                document.getElementById("comment").innerHTML +=commentComponent(res,res2);
            });
            document.getElementById("post-comment").value="";
        })
}

export {getPostById,addComment};
