import jwt from "jsonwebtoken";

export const verifyToken=(req,res,next)=>{
    //console.log(JSON.parse(JSON.stringify(req.cookies)));
    const token = req.cookies.jwt;
    //console.log({token});
    if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });
    jwt.verify(token, process.env.JWT_KEY, async(err,payload)=>{
          if(err) return res.status(403).send("Token is not valid!");
          req.userId=payload.userId;
          next();
        });
}