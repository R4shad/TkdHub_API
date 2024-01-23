import { Router } from "express";
import { getChampionships } from "../controllers/championship.controllers";

const router = Router();

router.get("/", getChampionships);

export default router;
