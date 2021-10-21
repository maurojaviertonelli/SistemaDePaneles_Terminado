const bcryptjs=require('bcryptjs');
const { red } = require('colors');
const db = require('../database/models');
const{validationResult}=require('express-validator');

const userControllers={
    login:(req,res)=>{
        res.render("login")
    },
    register:(req,res)=>{
        res.render("register")
    },
    registerPost:async(req,res)=>{
        /*const errors = validationResult(req);        documentacion oficial de express-validator
        if (!errors.isEmpty()) {
           res.status(400).json({ errors: errors.array() });
           console.log(errors)
        }*/
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const valores= req.body
            const validaciones = errors.array()
            res.render('register',{
                validaciones:validaciones,
                valores:valores

            })
        }else{
            const user = req.body.user;
            const name = req.body.name;
            const rol = req.body.rol;
            const pass = req.body.pass;
            const avatar = "/public/img/users_img/"+req.file.filename
            const passwordHash = await bcryptjs.hash(pass,8)
            db.User.create({
                user: user,
                name: name,
                rol: rol,
                pass: passwordHash,
                avatar:avatar
            })
            .then(()=>{
                res.render('register',{
                    alert:true,
                    alertTitle: "Registration",
                    alertMessage:"¡Successful Registration",
                    alertIcon:'success',
                    showConfirmButton:false,
                    timer: 1500,
                    ruta:'/login'
                })
            })
            .catch(err=>{
                console.error(err)
            })

        }
        

    },
    loginPost:(req,res)=>{
        const users = req.body.user
        const password = req.body.pass
        if(users && password){
        db.User.findOne({
            where:{
                user:users
            },
          }).then(datos=>{
              if(datos) {
                if(!(bcryptjs.compareSync(password,datos.pass)) || (datos.user!==users)){
                    res.render('login',{
                        alert:true,
                        alertTitle: "Error",
                        alertMessage:"¡Usuario y/o password incorrectos",
                        alertIcon:'error',
                        showConfirmButton:true,
                        timer: 3500,
                        ruta:'login'
                    })
                }
                else{
                    console.log(datos.avatar.red)
                    req.session.loggedin=true          //creo una varaible de session y en caso de que nos logeemos este en true
                    req.session.name = datos.name            //creo una variable de session a mi gusto y guardo en session el nombre para luego utilizarlo en la vista. 'Datos.name' seria mi nombre en la base de datos
                    req.session.rol = datos.rol
                    req.session.user = datos.user
                    req.session.avatar = datos.avatar 
                    res.render('login',{
                        alert:true,
                        alertTitle: "Conexion exitosa",
                        alertMessage:"¡Login correcto",
                        alertIcon:'success',
                        showConfirmButton:false,
                        timer: 1500,
                        ruta:''
                    })
                }
              } else {
                res.render('login',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessage:"¡El usuario no existe",
                    alertIcon:'error',
                    showConfirmButton:true,
                    timer: 3500,
                    ruta:'login'
                })
              }
              console.log(datos)
          })
        } else {
            //res.send('usuario y/o contraseña nulas')
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage:"¡Por favor ingrese un usuario y contraseña",
                alertIcon:'warning',
                showConfirmButton:true,
                timer: 3500,
                ruta:'login'
            })
        }
              
    }
}

module.exports=userControllers