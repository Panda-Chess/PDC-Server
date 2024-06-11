import userRouter from "./user";
import authRouter from "./auth";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;