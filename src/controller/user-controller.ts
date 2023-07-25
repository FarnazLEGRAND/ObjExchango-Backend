import { Router } from "express";
import Joi from "joi";
import { ObjectId } from "mongodb";
import { checkId } from "../middleware";
import { userRepository } from "../repository/user-repositoty";


export const userController = Router();

userController.get('/', async (req,res) => {
    const user = await userRepository.findAll();
    res.json(user);
});

userController.get('/:id', checkId, async (req,res) => {
    
    const user = await userRepository.findById(req.params.id);
    if(!user) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(user);
});

userController.post('/', passport.authenticate('jwt',{session:false}), async (req,res) => {
    const validation = userValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    const user = await userRepository.persist(req.body);
    res.status(201).json(user);
});

userController.delete('/:id', checkId, async (req,res)=> {
    await userRepository.remove(req.params.id);
    res.status(204).end();
});


userController.patch('/:id', checkId, async (req,res)=> {
    const validation = userPatchValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await userRepository.update(req.params.id, req.body);
    res.json(req.body);
});


const userValidation = Joi.object({  
        name: Joi.string().required(),
        demail: Joi.string().required(),
        password: Joi.string().required(),
    
});


const userPatchValidation = Joi.object({
    name: Joi.string().required(),
    demail: Joi.string().required(),
    password: Joi.string().required(),

});



