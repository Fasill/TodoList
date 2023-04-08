import express from 'express';
import {homecontroler,loginControler,registerControler,saveregisteration,getlogin,logout} from '../controler/registrationControler.js';

const regRouter  = express.Router();


regRouter.get('/',homecontroler);
regRouter.get('/login',getlogin);
regRouter.post('/login',loginControler);
regRouter.get('/register',registerControler);
regRouter.post('/register',saveregisteration);
regRouter.get('/logout',logout);

export default regRouter;
