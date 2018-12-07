const express=require('express');

const app=express();

app.use(express.static('public'));
// app.set('views','./views');

app.use(express.json());

let port =process.env.PORT || 3001;
let hostname= process.env.hostname || "127.0.0.1";

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/src/views/index.html");
});

app.get("/login",(req,res)=>{
  res.sendFile(__dirname+"/src/views/login.html");
});

app.post("/login",(req,res)=>{
  console.log(req.body);
  res.send({error:"Error"})
});

app.get("/post",(req,res)=>{
  res.sendFile(__dirname+"/src/views/post.html");
});

app.get("/usuarios",(req,res)=>{
  res.sendFile(__dirname+"/src/views/usuarios.html");
});
app.get("/perfil",(req,res)=>{
  res.sendFile(__dirname+"/src/views/perfil.html");
});



app.listen(port,hostname,()=>{
  console.log(`Corriendo el puerto ${port} hostname ${hostname}`);
})