const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')

const usersControllers = require('../controllers/usersControllers');
const validationFormSignUp = require('../middlewares/validationFormSIgnUp');
const authMiddleware =require('../middlewares/authMiddlware')
//multer config
const multerDS = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/img/users_img'));    //Ruta donde almacenamos el archivo, si uso servidor puedo poner la ruta de mi servidor ejmplo www.miservidor.com
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let nameImage = Date.now()+path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, nameImage);         
    }
});
const uploadFile=multer({storage:multerDS});

//login routes
router.get('/login',authMiddleware,usersControllers.login)
router.post('/auth',usersControllers.loginPost)

//register routes
router.get('/register',authMiddleware,usersControllers.register)
router.post('/register',uploadFile.single('avatar'),validationFormSignUp,usersControllers.registerPost)

module.exports=router
