import { NextRequest, NextResponse } from 'next/server';
import {allService, refresh} from "@/services/api.services";
import {helper} from "@/app/api/all-data/util/helperTag";
import {IResponse} from "@/models/response-model/IResponse";
import {IUser} from "@/models/users-model/IUser";
import {IRecipe} from "@/models/recipes-model/IRecipe";


export async function GET(req: NextRequest) {

    const token = req.headers.get("Authorization");

    if (!token) {
        const response = NextResponse.json('reject')
        response.cookies.set("error", "error");
        return response;
    }

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const {type, params} = helper(searchParams);

    try {

        const users = await allService<IResponse<IUser[]> | IResponse<IRecipe[]>>(type, params, 'Authorization', token);
        return NextResponse.json(users);
    } catch {
        try {
            const newUser = await refresh();
            const newToken = newUser.accessToken;
            const token = `Bearer ${newToken}`
            const users = await allService<IResponse<IUser[]> | IResponse<IRecipe[]>>(type, params, 'Authorization', token);

            return NextResponse.json(users);
        } catch {
            const response = NextResponse.json('reject')
            response.cookies.set("error", "error");
            return response;
        }
    }
}
