import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import router from './router/todoRouter.js';
import regRouter from './router/regRouter.js'
import methodOverRide from 'method-override';
import requireAuth from './midlware/authmidleware.js';

const app = express();

app.use(methodOverRide('_method'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

app.use('/',regRouter)
app.use('/',requireAuth,router)

var port = 8080;
mongoose.connect(
  'mongodb+srv://mongo:mongo@confusion.jpav0c7.mongodb.net/?retryWrites=true&w=majority')
    .then(() => app.listen(port))
    .then(() => console.log(`Server started on port http://localhost:${port}/`))
    .catch((err)=>console.log(err));
