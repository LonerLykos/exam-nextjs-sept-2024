'use server';
import {deleteCookie} from "cookies-next/server";
import {cookies} from "next/headers";

export const logoutAction = async () => {
    await deleteCookie('authUser', {cookies});
    await deleteCookie('login', {cookies});
}