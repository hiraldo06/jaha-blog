import {postLikeView} from './index';

const dandoLike=(e)=>{
    // dando like
    if(typeof e.path != "undefined" || e.originalTarget != "undefined"){
        console.log(e);
        if(typeof e.path != "undefined"){
            let result= String(e.path[0].id)? String(e.path[0].id).split("-"):String(e.path[1].id).split("-");
            
            if(result[0]==="like"){
                postLikeView(result[1]);
            }
            console.log("en el path google si ", e.path[0].id)
        }

        if(typeof e.originalTarget != "undefined"){
            
            let result=String(e.originalTarget.id)? String(e.originalTarget.id).split("-"):String(e.originalTarget.farthestViewportElement.id).split("-");
            if(result[0]==="like"){
                postLikeView(result[1]);      
            }
            console.log("en el path FIREFOX ", e.originalTarget.id,result)
        }
       
   }else if(e.target.id!=""){
    let result= String(e.target.id).split("-");
            
    if(result[0]==="like"){
        postLikeView(result[1]);
    }
   }

}

export {dandoLike};