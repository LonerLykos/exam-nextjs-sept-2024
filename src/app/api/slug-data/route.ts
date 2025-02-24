import { NextRequest, NextResponse } from 'next/server';
import {helperTagsRecipes} from "@/app/api/slug-data/utils/slug-util";
import {myRequest} from "@/app/api/slug-data/utils/requester";

export async function GET(req: NextRequest) {

    const token = req.headers.get("Authorization");

    if (!token) {
        const response = NextResponse.json('reject')
        response.cookies.set("error", "error");
        return response;
    }

    const urlMy = new URL(req.url);
    const searchParams = urlMy.searchParams;

    const {type, params} = helperTagsRecipes(searchParams);

    return await myRequest(type, params, token);
}
