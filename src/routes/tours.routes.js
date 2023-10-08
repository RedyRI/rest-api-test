import { Router } from "express"
import { getTours } from "../controllers/tours.controller.js";
import { getTour } from "../controllers/tours.controller.js";
import { createTour } from "../controllers/tours.controller.js";
import { updateTour } from "../controllers/tours.controller.js";
import { deleteTour } from "../controllers/tours.controller.js";

const router = Router()

router.get("/tours", getTours);

router.get("/tours/:id", getTour);

router.post("/tours", createTour);

router.delete("/tours/:id", deleteTour);

router.patch("/tours/:id", updateTour);


export default router