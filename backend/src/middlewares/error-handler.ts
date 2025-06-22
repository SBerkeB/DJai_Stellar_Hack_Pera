import { Request, Response } from "express";

import ErrorModel from "../models/error-model";



const errorHandler = (err: ErrorModel, req: any, res: Response) => {
    // Log the error, for example with console.error or a logging library
    // console.error(err.stack);
    // console.error("Error handler middleware HIT!");
    
    // res.status(err.status || 500);

    // res.json({ error: err.message });

    // console.log("Error handler middleware HIT!");

    // if (req.ws) {
    //     console.error("ERROR from WS route - ");
    // } else {
    //     console.error("err");
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.status(500).send(err.stack);
    // }
};


export default errorHandler;