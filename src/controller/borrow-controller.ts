import { Router } from "express";
import { /borrowRepository } from "../repository/borrow-repository";
import { checkId } from "../middleware";
import Joi from "joi";
import passport from "passport";
import { borrowRepository } from "../repository/borrow-repository";


export const borrowController = Router();

borrowController.get('/', async (req,res) => {
    const borrow = await borrowRepository.findAll();
    res.json(borrow);
});

borrowController.get('/:id', checkId, async (req,res) => {
    
    const borrow = await borrowRepository.findById(req.params.id);
    if(!borrow) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(borrow);
});

borrowController.post('/', async (req,res) => {
    const borrow = req.body;
    const {error} = borrowValidation.validate(borrow);
    if(error) {
        res.status(400).json(error);
        return;
    }
    await borrowRepository.persist(borrow);
    res.status(201).json(borrow);
});

borrowController.delete('/:id', checkId, async (req,res)=> {
    await borrowRepository.remove(req.params.id);
    res.status(204).end();
});


borrowController.patch('/:id', checkId, async (req,res)=> {
    const validation = borrowPatchValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await borrowRepository.update(req.params.id, req.body);
    res.json(req.body);
});


const borrowValidation = Joi.object({
    borrowDate: Joi.date(),
    returnDate: Joi.date(),
    borrowDate: Joi.date(),   
    borrower: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }).required(),
    object: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        owner: Joi.string().required()
    }).required(),
});


const borrowPatchValidation = Joi.object({
    borrowDate: Joi.date(),
    returnDate: Joi.date(),
    borrowDate: Joi.date(),   
    borrower: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }).required(),
    object: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        owner: Joi.string().required()
    }).required(),
});
