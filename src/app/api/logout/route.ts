import {menuAction} from "@/server-actions/menuAction";
import {NextResponse} from "next/server";


export async function POST() {
    await menuAction();
    return NextResponse.json({ message: 'Logged out' });
}
