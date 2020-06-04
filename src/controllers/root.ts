import { Request, Response } from "express";
class RootController {
    public index(req: Request, res: Response): void {
        res.send("Hello World!")
    }
}

export default new RootController()