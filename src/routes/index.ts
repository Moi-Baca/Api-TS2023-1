import express from 'express';
const router  = express.Router();

import empresasRouter from './empresas/empresas';
import usuariosRouter from './usuarios/usuarios';

router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 router.get('/version',(_req, res) => {
  const version: string = "1.0.0";
  const jsonResp = {"name": "FODA BE", "version": version};
  //string, number, boolean, object, array, null, undefined, class, interface, function
  res.json(jsonResp);
 });

  router.use('/empresas', empresasRouter);
  router.use('/usuarios', usuariosRouter);

//router.get router.post router.put router.delete router.use
export default router;
