import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const SECRET = process.env.JWT_SECRET
class Authorization {
    authorized (req,res,next) {
        const headerToken = req.headers.authorization;
        if(headerToken){
            const token = headerToken.split(" ")[1]
            const verified = jwt.verify(token,SECRET)
            if(verified){
                next()
            }else{
                return res.status(401).json({errors:[{msg:"Please add a valid token"}]})
            }
        }else{
            return res.status(401).json({errors:[{msg:"Please add a token"}]})
        }
    }
}

const authorization = new Authorization()

export default authorization