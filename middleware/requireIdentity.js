const requireIdentity = (req,res,next)=>{
    if(req.identity && req.identity.authenticated){
        next();
    }
    else{
        return res.status(401).send('Unauthorized');
    }
            
}

module.exports=requireIdentity;