import jwt from 'jsonwebtoken';

const requireAuth = (req,res,next)=>{
  const token = req.cookies.jwt;

  if(token){
    jwt.verify(token,'fasil',(err,decodedToken)=>{
      if(err){
        console.log(err.message);
        res.redirect('/login')
      }else{
        next()
      }
    })
}else{
  res.redirect('/login')
  }
}
export default requireAuth;