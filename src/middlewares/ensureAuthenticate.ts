import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticate(
    request: Request,
    response: Response,
    next: NextFunction
) {

    const authtoken = request.headers.authorization;

    if (!authtoken) {
        return response.status(401).end();
    }

    const [, token] = authtoken.split(" ");

    try {
        const { sub } = verify(token, "c3fddfba45219be8f81ee3d793024ddb") as IPayload;

        request.user_id = sub;
        return next();
    } catch (err) {
        return response.status(401).end();
    }


    return next();

}
