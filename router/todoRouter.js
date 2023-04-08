import express from 'express';

import { savetodoControler,formControler,todoControler,idControler } from '../controler/todoControler.js';

const router  = express.Router();

router.delete('/todo/:id',idControler);
router.post('/todo/save',savetodoControler);
router.get('/todo/new',formControler);
router.get('/todo',todoControler);

export default router;
