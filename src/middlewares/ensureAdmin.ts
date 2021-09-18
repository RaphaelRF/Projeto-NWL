import { Request, Response, NextFunction } from "express"
import { getCustomRepository } from "typeorm";
import { resolveTypeReferenceDirective } from "typescript";
import { UserRepositories } from "../repositories/UserRepositories";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {

    const { user_id } = request;
    console.log(user_id);

    const usersRepositories = getCustomRepository(UserRepositories);

    const { admin } = await usersRepositories.findOne(user_id)

    if (admin) {
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized",

    });


}