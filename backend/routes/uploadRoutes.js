import path from "path"; //from Node.js (it had method on it called extname - it gets the extension of the file name)
import express from "express";
import multer from 'multer';

const router = express.Router();



//---START----MULTER configuration-------///
//-------recieves object with two functions-------//
const storage = multer.diskStorage(
    {
        destination(req, file, cb) {
            cb(null, 'uploads/')
        },
        filename(req, file, cb){
//------- we have access to file.fieldname so we can create file name with implementing functionality to avoid uploading files with same name-------//
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
            // cb(null, file.originalname)
            //---resulting file name should be: fieldname-date.extension
        }
    }
)

function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png/
    //----testing file extensions, returns true or false----//
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    }else{
        cb('Images Only!')
    }
}
//----END---MULTER configuration-------//

const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})

//-------remember to call the uploaded image "image" in the frontend-------//
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router;