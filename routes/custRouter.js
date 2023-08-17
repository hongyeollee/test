import express from "express";
const router = express.Router();

import * as custController from "../controllers/custController.js";

router.post("/", custController.createCust);
router.patch("/:guest_code", custController.updateCust);
router.delete("/:guest_code", custController.deleteCust);

export default router;
