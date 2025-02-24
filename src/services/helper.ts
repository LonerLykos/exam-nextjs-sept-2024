import { cookies } from "next/headers";
import {IUserInfoWithTokens} from "@/models/user-with-token-model/IUserInfoWithToken";

export const getAuthUser = async <T>() => {
    const validUser = (await cookies()).get('authUser')?.value;
    const userWithToken: IUserInfoWithTokens | null = validUser ? JSON.parse(validUser) : null;
    if (!userWithToken) {
        return null;
    }
    return userWithToken as T;
}
