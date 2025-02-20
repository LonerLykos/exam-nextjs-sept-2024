'use client';

import {useForm} from "react-hook-form";
import classNames from "classnames";
import "./FormLogin.scss"
import {zod} from "@/lib/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {schema} from "@/validator/login.validator";
import {useRouter} from "next/navigation";
import {useDeleteCookie, useGetCookie} from "cookies-next/client";
import {useEffect} from "react";
import {useChecker} from "@/components/form/useChecker";
import {loginAction} from "@/server-actions/loginAction";

export type LoginData = zod.infer<typeof schema>

export const FormLogin = () => {
    const {register, formState: {isValid, errors}, reset, handleSubmit}
        = useForm<LoginData>({mode: 'onChange', resolver: zodResolver(schema)});

    const router = useRouter();
    const deleteCookie = useDeleteCookie();
    const getCookie = useGetCookie();
    const login = getCookie('login') || '';
    const validation = getCookie('validation') || '';
    const newError = getCookie('error') || '';

    useEffect(() => {

        if (login === 'true') {
            router.push('/');
        }
    }, [login]);


    const {error, message} = useChecker(login, validation, newError)


    const myHandler = async (formData: LoginData) => {
        deleteCookie('validation');
        deleteCookie('error');
        await loginAction(formData);
        setTimeout(() => {
            reset();
        }, 500)

    };

    return (

        <div className={classNames('form-wrapper')}>
            <h1>Sing In</h1>
            <form onSubmit={handleSubmit(myHandler)}>

                <label>
                    <select {...register('username')} defaultValue="">
                        <option value="" disabled>Choose user...</option>
                        <option value="emilys">User 1</option>
                        <option value="avah">User 2</option>
                    </select>
                </label>

                <label>
                    <select {...register('password')} defaultValue="">
                        <option value="" disabled>Choose pass...</option>
                        <option value="emilyspass">Password 1</option>
                        <option value="avahpass">Password 2</option>
                    </select>
                </label>

                <button disabled={!isValid || Object.keys(errors).length > 0}
                        className={classNames({'disable': !isValid}, {'active': isValid})}>Login
                </button>

                <p className={!error ? 'hide' : 'view'}>{message}</p>
            </form>
        </div>
    );
};
