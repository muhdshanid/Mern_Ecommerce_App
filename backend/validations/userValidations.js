import {body} from 'express-validator'

export const registerValidations = [
    body("name").not().isEmpty().trim().escape().withMessage("name is required"),
    body("email").isEmail().normalizeEmail().trim().escape().withMessage("email is required"),
    body("password").isLength({min:5}).trim().withMessage("password should be 5 characters long")
]
