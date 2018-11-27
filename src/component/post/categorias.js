let addTags=(tags)=>{
    console.log("hola add categoria");
    
    let element=document.getElementById("tarea");
    let tarea=String(element.value).toLocaleUpperCase();
    
    if(tags.find(tag=>tag===tarea)||tarea==="" || tags.length>4){
        return;
    }
    tags.push(tarea);
    console.log(tags);
    
    
    listar(tags);
    element.value="";
    return tags;
}
let listar=(tags)=>{
    document.getElementById("tags-list").innerHTML ="";
    tags.forEach((element,id) => {
        document.getElementById("tags-list").innerHTML +=`<li class='tags-li'><span>${element}</span>  <span class='tags-delete' id="${element}-${id}">  x</span></li>`;
    });
}

let borrarTags=(id,tags)=>{
    let index=id.split("-");
    console.log("index",index[1]);
    
    tags.splice(index[1], 1);
    listar(tags);
    return tags;
}

export {addTags,borrarTags};