import { Router } from "express";
const router = Router();

const { convertNumber } = require("../controllers/convertController");

router.get("/", convertNumber);

module.exports = router;
