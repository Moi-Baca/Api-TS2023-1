import express from 'express';
const router  = express.Router();


import { Empresas, IEmpresa } from '@libs/Empresas/Empresas';
const empresasModel = new Empresas();

empresasModel.add({
    codigo: '',
    nombre: 'Empresa 1',
    status: 'Activo'
});


router.get('/', (_req, res) => {
    const jsonUrls = {
        "getAll":{"method":"GET","url":"/empresas/all"},
        "getById":{"method":"GET","url":"/empresas/:byid/:id"},
        "new":{"method":"POST","url":"/empresas/new"},
        "update":{"method":"PUT","url":"/empresas/upd/:id"},
        "delete":{"method":"DELETE","url":"/empresas/del/:id"}
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', (_req, res) => {
    res.status(200).json(empresasModel.getall());
}); 

router.post('/new', (req, res) => {
    console.log("Empresas /new request", req.body);
    const 
    {nombre ="Moises Baca", 
    status="Activo"
} = req.body;
    const newEmpresa: IEmpresa = {
        codigo: '',
        nombre,
        status
    };
    if(empresasModel.add(newEmpresa)){
        return res.status(200).json({"created":true});
    }
    return res.status(404).json({"error":"Error al crear la empresa"});
});

router.put('/upd/:id', (req, res) => {
    const {id} = req.params;
    const {nombre="Moises", status="activo", observaciones=""} = req.body;
    const updateEmpresa: IEmpresa = {
        codigo: id,
        nombre,
        status,
        observaciones
    };
    if(empresasModel.update(updateEmpresa)){
        return res.status(200).json({"updated":true});
    }
    return res.status(404).json({"error":"Error al actualizar la empresa"});

});

router.delete('/del/:id', (req, res) => {
    const {id : codigo} = req.params;
    if(empresasModel.delete(codigo)){
        return res.status(200).json({"deleted":true});
    }
    return res.status(404).json({"error":"Error al eliminar la empresa"});
});

router.get('/:byid/:id', (req, res) => {
    const {id : codigo} = req.params;
    const empresa = empresasModel.getById(codigo);
    if(empresa){
        return res.status(200).json(empresa);
    }
    return res.status(404).json({"error":"No se encontro la empresa"});9
});
export default router;