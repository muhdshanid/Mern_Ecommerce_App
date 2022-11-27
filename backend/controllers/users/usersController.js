import {validationResult} from 'express-validator'
import UserModel from '../../models/User.js'
import jwt from 'jsonwebtoken'
import { hashedPassword } from '../../services/authServices.js'

// @route POST /api/register
//@access Public
//@desc Create user and return token
export const registerUser = async (req,res)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const {name,email,password} = req.body
        try {
            const emailExist = await UserModel.findOne({email})
            if(!emailExist){
               const hashed = await hashedPassword(password)
               const user = await UserModel.create({name,email,password:hashed})
               return res.status(201).json({msg:"Your account has been created"})
            }else{
                //email already taken
                return res.status(401).json({errors:[{msg:`${email} is already taken`}]})
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json("Server internal error")
        }
    }else{
        //validations failed
       return res.status(400).json({errors:errors.array()})
    } 

}