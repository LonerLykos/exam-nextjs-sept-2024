import { NextRequest, NextResponse } from 'next/server';
import {allService, refresh} from "@/api/api.services";
import {helper} from "@/app/api/all-data/util/helperTag";


export async function GET(req: NextRequest) {

    const token = req.headers.get("Authorization");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const {type, params} = helper(searchParams);

    try {

        const users = await allService(type, params, 'Authorization', token);
        return NextResponse.json(users);
    } catch {
        try {
            const newUser = await refresh();
            const newToken = newUser.accessToken;
            const token = `Bearer ${newToken}`
            const users = await allService(type, params, 'Authorization', token);

            if (!users) {
                return NextResponse.json({ message: 'Повторний запит не успішний' }, { status: 400 });
            }
            return NextResponse.json(users);
        } catch {
            return NextResponse.json({ message: 'Помилка оновлення токену' }, { status: 500 });
        }
    }
}
