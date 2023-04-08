import bcrypt from 'bcryptjs';
import registerarion from '../models/registerarion.js';
import jwt from 'jsonwebtoken';

const maxAge = 3*24*60*60;
const createToken = (id)=>{
  return jwt.sign({ id },'fasil',{
    expiresIn:maxAge,})
}
export const homecontroler = (req, res) =>{res.render('home')}
export const loginControler =async(req, res) =>{
  const {email,password} = req.body;
  let user;
  try{
    user = await registerarion.findOne({email});
  }catch(e){console.log(e);}
  if (!user){
    console.log('email does not exist')
    res.redirect('/login');
  }
  const isPasswordCorrect = bcrypt.compareSync(password,user.password);
  
  if (!isPasswordCorrect){
    return res.status(400).json({message:"Incorrect password"})
    }
  const token = createToken(user._id);
  res.cookie('jwt',token,{httpOnly: true,maxAge:maxAge*1000});
  res.redirect('/todo');
}
export const getlogin = (req, res) => {res.render('login_form')}

export const saveregisteration = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await registerarion.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new registerarion({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = createToken(newUser._id);
    res.cookie('jwt',token,{httpOnly: true,maxAge:maxAge*1000});
    res.redirect('/login')
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });}
};
export const registerControler = (req,res,next)=>{
  res.render('register');
}
export const logout =(req,res,next)=>{
  res.cookie('jwt','',{maxAge:1})
  res.redirect('/')
}