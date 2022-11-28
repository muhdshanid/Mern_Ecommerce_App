import {body} from 'express-validator' 

export const categoryValidations= [
    body('name').not().isEmpty().trim().escape().withMessage("category is required")
]