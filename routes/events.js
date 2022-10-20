// Users Routes
// host+/api/events
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { validateJWT } = require('../middlewares/validate-jwt')
const { validateFields } = require('../middlewares/validate-fields')
const { getEvents, newEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { isDate } = require('../helpers/isDate')


router.use(validateJWT)

//validate all for JWT
router.get('/', getEvents)

router.post('/', [//middlewares
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields
], newEvent)

router.put('/:id', [//middlewares
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields
], updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router





