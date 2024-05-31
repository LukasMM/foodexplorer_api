const { Router } = require('express')
const multer = require('multer')
const { MULTER } = require('../configs/upload')

const authenticated = require('../middlewares/authenticated')

const DishesController = require('../controllers/DishesController')

const dishesRouter = Router()
const upload = multer(MULTER)

const dishesController = new DishesController()

dishesRouter.use(authenticated)

dishesRouter.get('/', dishesController.index)
dishesRouter.get('/:id', dishesController.show)
dishesRouter.post('/', dishesController.create)
dishesRouter.put('/:id', dishesController.update)
dishesRouter.delete('/:id', dishesController.delete)
dishesRouter.patch('/:id', upload.single('img'), dishesController.img)

module.exports = dishesRouter