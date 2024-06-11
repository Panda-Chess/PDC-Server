import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes";
import path from "path";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());


export async function startServer() {
    const serverPort = process.env.PORT;
    
    app.use("/api", router);

    app.use(express.static(path.join(__dirname, "./../node_modules/@panda-chess/pdc-client/dist")));    
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./../node_modules/@panda-chess/pdc-client/dist/index.html"));
    });

    app.listen(serverPort, () => {
        console.log("Server is running on port " + serverPort);
    });
}

startServer();