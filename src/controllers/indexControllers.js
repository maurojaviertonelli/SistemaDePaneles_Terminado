const indexControllers={
    index:(req,res)=>{
       console.log(req.session.user)
        if(req.session.loggedin){
           res.render('index',{
               login:true,
               name:req.session.name,
               rol:req.session.rol
           })
       }else{
           res.render('index',{
               login:false,
               name:'debe iniciar sesion ',
               rol:req.session.rol
           })
       }
    },
    sessionDestroy:(req,res)=>{
        req.session.destroy(()=>{
            res.redirect('/')
        })
    },
    dashboard:(req,res)=>{
        res.render('dashboard',{
            user:req.session.user,
            name:req.session.name,
            rol:req.session.rol
        })
        
    }
}

module.exports=indexControllers