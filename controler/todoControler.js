import jwt from 'jsonwebtoken';
import registerarion from '../models/registerarion.js';
import todo from '../models/todo_model.js';

export const savetodoControler = async(req,res,next)=>{
  const {title,description} = req.body;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token);
  const id = decodedToken.id;
  const newtodo = new todo({
    title,
    description,
  })
  try{
    await newtodo.save();

    const registration = await registerarion.findById(id);
    registration.todolist.push(newtodo);
    await registration.save();

  }catch(err){
    console.log(err);}
  
  res.redirect('/todo')
}
export const formControler = (req,res,next)=>{
  res.render('form')
}
export const todoControler = async(req,res,next)=>{
  let todos;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token);
  const id = decodedToken.id;
  try{

      const todolist = await registerarion.findById(id);
      todos = todolist.todolist;
      res.render('todo',{todos})

  }catch(err){console.log(err)}
  

  
}

export const idControler =  async (req, res) => {
  const { id } = req.params;

  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token);
  const todoid = decodedToken.id;

  try {
    await todo.findByIdAndRemove(id);

    const finding_user = await registerarion.findById(todoid)
    await finding_user.todolist.pull(id)
    await finding_user.save();


    res.redirect('/todo')

  } catch (err) {
    console.error(err);
    res.send('Error deleting Todo');}

}