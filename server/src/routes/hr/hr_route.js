const express = require('express')
const router = express.Router()
const hr_controller = require('../../controller/hr_controller/hr_controller')

router.post('/create-profile', hr_controller.CreateProfile)
router.get('/get-profile', hr_controller.GetProfile)
router.put('/minput-profile', hr_controller.MinputProfile)

module.exports = router