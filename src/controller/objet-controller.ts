import { Router } from "express";
import { objetRepository } from "../repository/objet-repository";

import Joi, { object } from "joi";

import { checkId } from "../middleware";


export const objetController = Router();

objetController.get('/', async (req,res) => {
    const objet = await objetRepository.findAll();
    res.json(objet);
});

objetController.get('/:id', checkId, async (req,res) => {
    
    const objet = await objetRepository.findById(req.params.id);
    if(!objet) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(objet);
});

objetController.post('/', async (req,res) => {
    const objet = req.body;
    const {error} = objetValidation.validate(objet);
    if(error) {
        res.status(400).json(error);
        return;
    }
    await objetRepository.persist(objet);
    res.status(201).json(objet);
});

// objectController.delete('/:id', checkId, async (req,res)=> {
//     await objectRepository.remove(req.params.id);
//     res.status(204).end();
// });


// objectController.patch('/:id', checkId, async (req,res)=> {
//     const validation = objectPatchValidation.validate(req.body, {abortEarly:false});
//     if(validation.error) {
//         res.status(400).json(validation.error);
//         return;
//     }
//     await objectRepository.update(req.params.id, req.body);
//     res.json(req.body);
// });


const objetValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    owner: Joi.object({
        name: Joi.string().required(),
        _id:Joi.string().required(),
    }).required(),
});




const objetPatchValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    owner: Joi.object({
        name: Joi.string().required(),
        _id:Joi.string().required(),
    }).required(),
});



