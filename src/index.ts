import express, { Request, Response } from "express";
import { getTasksData, testMongo } from "./Utils/mongoUtils";

const app = express();

const port = process.env.PORT || 6868;

app.get("/getTasks", async (req: Request, res: Response) => {
    const result = await getTasksData();
    const newResult = result?.map(({ uuid, text, children }) => ({ uuid, text, children }));
    res.json(newResult);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
