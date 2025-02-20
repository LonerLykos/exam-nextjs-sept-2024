'use server';
import {deleteCookie} from "cookies-next/server";
import {cookies} from "next/headers";

export const menuAction = async () => {
    await deleteCookie('authUser', {cookies});
    await deleteCookie('login', {cookies})
}