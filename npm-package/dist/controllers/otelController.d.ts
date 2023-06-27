import { Request, Response, NextFunction } from 'express';
type MainController = (req: Request, res: Response, next: NextFunction) => void;
type HelperController = (req: Request, data: any) => {};
export interface OtelControllerType {
    parseAllRequest: MainController;
    parseNodeRequest: HelperController;
}
export declare const otelController: OtelControllerType;
export {};
