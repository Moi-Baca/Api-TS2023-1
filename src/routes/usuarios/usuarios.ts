import express from 'express';
const router  = express.Router();

import { Usuarios, IUsuario } from '@libs/Usuarios/Usuarios';
const usuariosModel = new Usuarios();

usuariosModel.add({
    codigo: '',
    nombre: 'Moises Baca',
    correo: 'moises@uni.com',
    password: 'moises123',
    roles: ['admin', 'public']
});

router.get('/all', (_req, res) => {
    res.status(200).json(usuariosModel.getall());
});

router.get('/getbyid/:id', (req, res) => {
    const {id:codigo} = req.params;
    const usuario = usuariosModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error":"Usuario no encontrado"});
});
router.post('/new', (req, res) => {
    console.log("Usuarios /new request", req.body);
    const
    {nombre ="Moises Baca",
    correo="moises@uni.com",
    password="moises123"

} = req.body;

const newUsuario: IUsuario = {
    codigo: '',
    nombre,
    correo,
    password
};
if(usuariosModel.add(newUsuario)){
    return res.status(200).json({"created":true});
}
return res.status(404).json({"error":"Error al crear el usuario"});
});

router.put('/upd/:id', (req, res) => {
    const {id} = req.params;
    const {nombre="", correo="", password=""} = req.body;
    const updateUsuario: IUsuario = {
        codigo: id,
        nombre,
        correo,
        password
    };
    if(usuariosModel.update(updateUsuario)){
        return res.status(200).json({"updated":true});
    }
    return res.status(404).json({"error":"Error al actualizar el usuario"});
});

router.delete('/del/:id', (req, res) => {
    const {id:codigo} = req.params;
    if(usuariosModel.delete(codigo)){
        return res.status(200).json({"deleted":true});
    }
    return res.status(404).json({"error":"Error al eliminar el usuario"});
});






export default router;

