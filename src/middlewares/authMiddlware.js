function authMiddleware(req,res,next){
    if(req.session.loggedin){
        return res.redirect('/');
    }
    next();
}
module.exports=authMiddleware;