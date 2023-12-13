const router = require('express').Router()
const crudController = require('../controller/crud.controller')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ 
    storage,
    fileFilter (req, file, cb) {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {       
            cb(null, false)
            return cb(new Error('only jpg, jpeg, png are allowed'))   
        }             
    },
})

router.get('/add',crudController.addForm)
router.post('/insert',upload.array('image',3),crudController.insertForm)
router.get('/',crudController.homePage)
router.get('/edit/:id',crudController.editForm)
router.post('/update',upload.array('image',3),crudController.update)
router.get('/imgview/:id/:pid',crudController.imageView)
router.get('/imgDelete/:id/:did', crudController.imageDelete)
router.get('/delete/:id',crudController.delete)

module.exports = router

