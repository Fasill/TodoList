import mongoose from 'mongoose';
import todo from './todo_model.js'
const Schema = mongoose.Schema;

const registerarion = new Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required:true,
  },
  password:{
    type: String,
    required:true
  },

  
  todolist: [ {title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  }}]
})

export default mongoose.model('registerarion',registerarion)