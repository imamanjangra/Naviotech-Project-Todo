import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const protect = async (req , res , next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            console.log(decoded);
            const user = await User.findById(decoded.id).select("-password");
            // console.log(user);
            if(!user){
                return res.status(401).json({
                    message : "User not found!"
                });
            }

            req.user = user;
            next();

        } catch (error) {
            return res.status(401).json({
                message : "not authorized user"
            })
        }
    }
    else{
        return res.status(401).josn({
            message : "not authorized user"
        })
    }
}