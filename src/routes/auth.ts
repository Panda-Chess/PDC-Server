import { databaseService } from "@panda-chess/pdc-microservices-agregator";
import { sign } from "jsonwebtoken";
import { Router } from "express";
import { User } from "@panda-chess/pdc-core";

const router = Router();

router.post("/login", async (req, res) => {
    console.log("Login: ", req.body);

    const { email, password } = req.body;
    const user = await databaseService.tryLogin(email, password);

    if (user) {
        const token = sign({ ID: user._id }, "secret", {
            expiresIn: "1h"
        });
        res.status(200).send({ token });
    } else {
        res.status(401).send("Invalid email or password");
    }
});

router.post("/register", async (req, res) => {
    console.log("Register: ", req.body);

    const newUser: User = req.body;

    const existingUser = await databaseService.getUserByEmail(newUser.email);

    if (existingUser) {
        res.status(400).send("User already exists");
        return;
    }

    const user = await databaseService.createUser(newUser);

    if (user) {
        const token = sign({ ID: user._id }, "secret");
        res.status(201).send({ token });
    }
});

export default router;