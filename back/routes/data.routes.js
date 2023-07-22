const router = require("express").Router();
const dataController = require("../controllers/data.controller");

//route data
router.get("/get-all-points", dataController.getAllPoints);
router.get("/get-my-data", dataController.getMyData);

module.exports = router;
