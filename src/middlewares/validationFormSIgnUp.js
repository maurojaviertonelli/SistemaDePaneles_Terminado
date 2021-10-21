
const{body}=require('express-validator');
const path = require('path')

const validationFormSignUp=[
    body('user').notEmpty().withMessage('*Ingrese su usuario'),
    body('name').notEmpty().withMessage('*Ingrese su nombre completo'),
    body('pass').isLength({min:5,max:255}).withMessage('*Ingrese contraseña válida (más de 5 caracteres)'),
    
    body('avatar').custom((value,{ req })=>{
        let file=req.file;
        let acceptedExtensions=['.png', '.webp', '.jpg'];
        if (!file){
            throw new Error('*Debe seleccionar su avatar');
        }else{
            let fileExtension=path.extname(file.originalname)
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
       
        return true;
    })
]



module.exports=validationFormSignUp