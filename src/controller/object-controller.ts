import { Router } from "express";
import { /objectRepository } from "../repository/object-repository";

import Joi, { object } from "joi";

import { objectRepository } from "../repository/object-repository";
import { checkId } from "../../middleware";


export const objectController = Router();

objectController.get('/', async (req,res) => {
    const persons = await objectRepository.findAll();
    res.json(object);
});

objectController.get('/:id', checkId, async (req,res) => {
    
    const object = await objectRepository.findById(req.params.id);
    if(!object) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(object);
});

objectController.post('/', async (req,res) => {
    const object = req.body;
    const {error} = objectValidation.validate(object);
    if(error) {
        res.status(400).json(error);
        return;
    }
    await objectRepository.persist(object);
    res.status(201).json(object);
});

objectController.delete('/:id', checkId, async (req,res)=> {
    await objectRepository.remove(req.params.id);
    res.status(204).end();
});


objectController.patch('/:id', checkId, async (req,res)=> {
    const validation = objectPatchValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await objectRepository.update(req.params.id, req.body);
    res.json(req.body);
});


const objectValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    owner: Joi.object({
        name: Joi.string().required(),
        demail: Joi.string().required(),
        password: Joi.string().required(),
    }).required(),
});




const objectPatchValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    owner: Joi.object({
        name: Joi.string().required(),
        demail: Joi.string().required(),
        password: Joi.string().required(),
    }).required(),
});



