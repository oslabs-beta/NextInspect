import { Request, Response, NextFunction } from 'express';
export declare const streamController: {
    emitEvent: (req: Request, res: Response, next: NextFunction) => void;
    sendEvent: (req: Request, res: Response, next: NextFunction) => void;
};
