const express = require('express')
const router = express.Router()
const hr_controller = require('../../controller/hr_controller/hr_controller')

router.post('/create-profile', hr_controller.CreateProfile)
router.get('/get-profile', hr_controller.GetProfile)
router.put('/put-fullprofile/:id', hr_controller.UpdateFullProfile)

router.get('/get-fullprofile/:id', hr_controller.GetFullProfile)


module.exports = router