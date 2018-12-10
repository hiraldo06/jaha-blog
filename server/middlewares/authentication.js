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

module.exports={
    sessionChecker,
    sessionCheckerRoute
}