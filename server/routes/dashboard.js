const express = require('express');
const router = express.Router();
const {checkLogIn} = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');

// dashboard routes
router.get("/dashboard", checkLogIn, dashboardController.dashboard);
router.get("/dashboard/item/:id", checkLogIn, dashboardController.dashboardViewNote);
router.put("/dashboard/item/:id", checkLogIn, dashboardController.dashboardUpdateNote);
router.delete("/dashboard/item-delete/:id", checkLogIn, dashboardController.dashboardDeleteNote);
router.get("/dashboard/create", checkLogIn, dashboardController.dashboardCreateNote);
router.post("/dashboard/create", checkLogIn, dashboardController.dashboardAddNote);

module.exports = router;