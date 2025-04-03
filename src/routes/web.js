const express = require('express')
const { getHompage } = require('../controllers/homeController')
const router = express.Router()
const { getHomepage, getTest, getDat2k4} = require('../controllers/homeController')

//router.Method('/route', handler);
router.get('/', getHomepage);

router.get('/dat2k4', getDat2k4)


router.get('/test', getTest);

module.exports = router; //export default