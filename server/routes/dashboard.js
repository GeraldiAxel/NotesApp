const express = require('express');
const router = express.Router();
const {checkLogIn} = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');

// dashboard routes
router.get("/dashboard", checkLogIn, dashboardController.dashboard);
router.get("/dashboard/item/:id", checkLogIn, dashboardController.dashboardViewNote);
router.put("/dashboard/item/:id", checkLogIn, dashboardController.dashboardUpdateNote);

module.exports = router;