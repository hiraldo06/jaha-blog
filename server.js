const express=require('express');
const fetch=require('node-fetch');

const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

const session= require('express-session');

const app=express();

app.use(express.static('public'));
// app.set('views','./views');

app.use(express.json());

let port =process.env.PORT || 3001;
let hostname= process.env.hostname || "127.0.0.1";


// app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    key: 'user_sid',
    secret:'hola',
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:600000
    }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      
      res.redirect('/');
  } else {
      console.log(req.session.user,": User ", "user_sid :",req.cookies.user_sid)
      next();
      
  }    
};

const sessionCheckerRoute = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        next();
    } else {
        console.log(req.session.user,": User ", "user_sid :",req.cookies.user_sid)
       res.redirect('/sign-in');
        
    }    
  };

// route for user Login
app.route('/sign-in')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, resp) => {
            let data={
                email:req.body.email ,
                password:req.body.password 
            }
            console.log("data",req.body,data)
        login(data).then(res=>{
            console.log("entro",res);
           
            if(typeof res.email != undefined){
                if(res.email === data.email){
                    req.session.user =res;
                  resp.json(
                      res
                  );
                }else{
                    resp.redirect('/sign-in')
                }
            }
        }).catch(err=>{
            console.log(err);
            resp.redirect('/sign-in')
        })
    });


    app.get("/registro",(req,res)=>{
        res.sendFile(__dirname+"/public/registro.html");
    });


app.get("/",sessionCheckerRoute,(req,res)=>{
  res.sendFile(__dirname+"/src/views/index.html");
});





app.get("/post",sessionCheckerRoute,(req,res)=>{
  res.sendFile(__dirname+"/src/views/post.html");
});

app.get("/usuarios",sessionCheckerRoute,(req,res)=>{
  res.sendFile(__dirname+"/src/views/usuarios.html");
});
app.get("/perfil",sessionCheckerRoute,(req,res)=>{
  res.sendFile(__dirname+"/src/views/perfil.html");
});

// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {  
            res.clearCookie('user_sid');
            res.redirect('/sign-in');
    } else {
        res.redirect('/sign-in');
    }
});

const login=async(data)=>{
       let result=await fetch("http://68.183.27.173:8080/login",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{"Content-Type":'application/json'}
        }).then(res=>res.json())
        .then(res=>{
           return res; // console.log(res);
        }).catch(err=>{
            return {
                err,
                status:500
            }
        })
        // console.log(" resultado : ",result)
        return result;
    }
app.listen(port,()=>{
  console.log(`Corriendo el puerto ${port} hostname ${hostname}`);
})
