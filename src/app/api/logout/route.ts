import {logoutAction} from "@/server-actions/logoutAction";
import {NextResponse} from "next/server";


export async function POST() {
    await logoutAction();
    const response = NextResponse.json({ message: 'Logged out' });
    response.headers.set('x-skip-redirect', 'true');
    return response;
}
