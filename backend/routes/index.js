import express from "express";
const router = express.Router();

import custRouter from "./custRouter.js";

router.use("/cust", custRouter);

export default router;
