const express = require('express')
const router = express.Router()
const hr_controller = require('../../controller/hr_controller/hr_controller')

router.post('/create-profile', hr_controller.CreateProfile)
router.put('/update-profile/:id', hr_controller.UpdateProfile)

router.get('/get-profile', hr_controller.GetProfile)
router.get('/get-profile/:id', hr_controller.GetProfileID)

router.put('/put-fullprofile/:id', hr_controller.UpdateFullProfile)
router.get('/get-fullprofile/:id', hr_controller.GetFullProfile)

router.get('/get-adduser/:id', hr_controller.GetAdduser)
router.put('/put-adduser/:id', hr_controller.UpdateAdduser)

router.put('/put-app-it/:id', hr_controller.UpdateAppit)
router.put('/put-app-ct/:id', hr_controller.UpdateAppct)
router.put('/put-app-head/:id', hr_controller.UpdateHead_hr)


module.exports = router