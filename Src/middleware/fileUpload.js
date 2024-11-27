import multer from "multer";

import { v4 as uuidv4 } from 'uuid';
import { AppError } from "../utils/AppError.js";


let options = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`) // upload images of category in uploads folder(category)
    },
    filename: function (req, file, cb) {
        console.log(file);
     cb(null, uuidv4() + "-" + file.originalname)
    //   cb(null,Date.now() + "_" + Math.random()* 1000 + "-" + file.originalname)
    }
  })


  function fileFilter (req, file, cb) {    
    
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else {
        cb(new AppError('Please upload only images',400),false)
    }      
  }
  return multer({ storage ,fileFilter})

}

export const fileUpload = (fieldName,folderName) => {

  return options(folderName).single(fieldName)

}

export const fileUploadMultiple = (arrayOfFieldNames,folderName) => {
  
  return options(folderName).fields(arrayOfFieldNames)
}


// export const fileUpload = (fieldName,folderName) => {

//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//           cb(null, `uploads/${folderName}`) // upload images of category in uploads folder(category)
//         },
//         filename: function (req, file, cb) {
//             console.log(file);
//          cb(null, uuidv4() + "-" + file.originalname)
//         //   cb(null,Date.now() + "_" + Math.random()* 1000 + "-" + file.originalname)
//         }
//       })


//       function fileFilter (req, file, cb) {    
        
//         if(file.mimetype.startsWith('image')){
//             cb(null, true)
//         }else {
//             cb(new AppError('Please upload only images',400),false)
//         }      
//       }
      
//       const upload = multer({ storage ,fileFilter})
//       return upload.single(fieldName)

// }



// export const fileUploadMultiple = (arrayOfFieldNames,folderName) => {

//   const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, `uploads/${folderName}`) // upload images of category in uploads folder(category)
//       },
//       filename: function (req, file, cb) {
//           console.log(file);
//        cb(null, uuidv4() + "-" + file.originalname)
//       //   cb(null,Date.now() + "_" + Math.random()* 1000 + "-" + file.originalname)
//       }
//     })


//     function fileFilter (req, file, cb) {    
      
//       if(file.mimetype.startsWith('image')){
//           cb(null, true)
//       }else {
//           cb(new AppError('Please upload only images',400),false)
//       }      
//     }
    
//     const upload = multer({ storage ,fileFilter})
//     return upload.fields(arrayOfFieldNames)

// }