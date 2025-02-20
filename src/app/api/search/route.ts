import {NextRequest, NextResponse} from "next/server";
import {helperTags} from "@/app/api/search/util/search-util";
import {searchRequest} from "@/app/api/search/util/requesterBySearch";

export async function GET(req: NextRequest) {

    const token = req.headers.get("Authorization");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const urlMy = new URL(req.url);
    const searchParams = urlMy.searchParams;

    const {subject, essence} = helperTags(searchParams);

    return await searchRequest(subject, essence, token);
}