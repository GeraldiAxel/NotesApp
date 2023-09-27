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
router.post("/dashboard/search", checkLogIn, dashboardController.dashboardSearchSubmit);
router.get("/dashboard/search", checkLogIn, dashboardController.dashboardSearch);
router.get("/dashboard/createGroup", checkLogIn, dashboardController.dashboardCreateGroup);
router.post("/dashboard/createGroup", checkLogIn, dashboardController.dashboardAddGroup);
router.get("/dashboard/group/:id", checkLogIn, dashboardController.dashboardViewGroup);
router.put("/dashboard/group/:id", checkLogIn, dashboardController.dashboardUpdateGroup);
router.put("/dashboard/add-to-group/:id", checkLogIn, dashboardController.dashboardAddToGroup);

module.exports = router;