import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // set the directory where uploaded files will be stored
        cb(null, 'public/upload');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        // set the name of the uploaded file
        cb(null, fileName);
    },

});
const fileFilter = (req, file, callback) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    )
        return callback(null, true)

    callback(new Error('Image file only!'), false)
}
const upload = multer({ storage, fileFilter });

export default upload;