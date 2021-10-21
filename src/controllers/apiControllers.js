const db = require("../database/models")

const apiControllers={
    totalUsers:(req,res)=>{
        db.User.findAll()
        .then((users)=>{
            res.render('apiUsers',{
                users:users
            })
            console.log(users)
        })
        
    },
    edit:(req,res)=>{
       const id= req.body.id_editar
       const name=req.body.nombre_editar
       const user= req.body.edad_editar
       db.User.update({
           name:name,
           user:user
        
       },{
           where:{id:id}

       }).then(()=>{
           res.redirect('users')
       })
       
    },
    delete:(req,res)=>{
        console.log(req.params.id)
        const id=req.params.id
        db.User.destroy({
            where:{
                id:id
            }
        })
        .then(()=>{
            res.redirect('/api/users')
        })
    },
    crear:(req,res)=>{
        //console.log(req.body.name)
        const fullName=req.body.name
        const user=req.body.user
        db.User.create({
            name:fullName,
            user:user,
            pass:0,
            rol:0
        })
        .then(()=>{
            res.redirect('/api/users')
        })
       // res.redirect('/api/users')

       
    }

}



module.exports=apiControllers