import jwt from "jsonwebtoken";

//next -> send in in next route
const isAuthenticated=async (req,res, next)=>{

     try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                Message: "User not authntication",
                success: false
            });
        }

    //if token exist then decode them    
const decode= await jwt.verify(token, process.env.SECRET_KEY);
    if(!decode){
        return res.status(400).json({
            Message: "inavlid token",
            success:false
        });
        
    }

    //this req.id into a updateprofile
    req.id=decode.userId;
    next();

     } catch (error) {
        console.log(error);
     }
}

export default isAuthenticated;