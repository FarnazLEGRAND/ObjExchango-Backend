import { Router } from "express";
import { /objectRepository } from "../repository/object-repository";
import { checkId } from "../middleware";
import Joi, { object } from "joi";
import passport from "passport";
import { objectRepository } from "../repository/object-repository";


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

objectController.post('/', passport.authenticate('jwt',{session:false}), async (req,res) => {
    const validation = objectValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    const object = await objectRepository.persist(req.body);
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



