'use server';
import {FormLoginData, login} from "@/services/api.services";
import {schema} from "@/validator/login.validator";
import {setCookie, deleteCookie} from "cookies-next/server";
import {LoginData} from "@/components/form/FormLogin";
import {cookies} from "next/headers";

export const loginAction = async (formData: LoginData) => {

    const parsed = schema.safeParse(formData);

    if (!parsed.success) {

        await setCookie('validation', 'error', {cookies});
        await deleteCookie ('login',{cookies});
        return false;

    } else {

        try {

            const loginData: FormLoginData = {
                username: parsed.data.username,
                password: parsed.data.password,
                expiresInMins: 1,
            };

            const userWithTokenInfo = await login(loginData);
            await deleteCookie ('validate',{cookies});
            await setCookie('authUser', JSON.stringify(userWithTokenInfo), {cookies,
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'strict',
            });
            await setCookie('login', 'true', {cookies});

            return true;

        } catch {
            await setCookie('login', 'false', {cookies});
            await deleteCookie ('validate',{cookies});
            return false;

        }
    }
};
