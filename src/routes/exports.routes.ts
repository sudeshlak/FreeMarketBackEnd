

import { Router } from "express";
import { adminAuth } from "../Middleware /adminAuth.middleware";
import { streamOrdersToCsv } from "../services/orderExport.service";

const router = Router();

router.get('/orders',adminAuth, async (req, res) => {
    await streamOrdersToCsv(res);
});

export default router;
