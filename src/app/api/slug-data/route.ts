import { NextRequest, NextResponse } from 'next/server';
import {helperTagsRecipes} from "@/app/api/slug-data/utils/slug-util";
import {myRequest} from "@/app/api/slug-data/utils/requester";

export async function GET(req: NextRequest) {

    const token = req.headers.get("Authorization");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const urlMy = new URL(req.url);
    const searchParams = urlMy.searchParams;

    const {type, params} = helperTagsRecipes(searchParams);

    return await myRequest(type, params, token);
}
