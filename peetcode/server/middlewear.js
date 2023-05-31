var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET;

module.exports = {
    auth : (req,res,next) => {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
           return res.status(403).json({msg:"User is'nt signedin"})
        }
       try {
        const decoded = jwt.verify(authHeader , JWT_SECRET)
        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next();
        }
        else{
           return res.status(403).json({msg:"Token doesnt exist"})
        }
       } catch (e) {
            return res.status(408).send(e.message)
       }
    }
}