import { Router } from "express";

const router = Router();

router.use("/", (req, res) => {
    res.send("User route");
});

export default router;