import {body} from 'express-validator' 

export const reviewValidations= [
    body('rating').not().isEmpty().trim().escape().withMessage("rating is required")
]