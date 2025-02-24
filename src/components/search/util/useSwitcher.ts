'use client';
import {useEffect, useState} from "react";
import {IUser} from "@/models/users-model/IUser";
import {IRecipe} from "@/models/recipes-model/IRecipe";
import {allRoute} from "@/services/route.services";
import {IResponse} from "@/models/response-model/IResponse";
import {useGetCookie} from "cookies-next/client";

export const useSwitcher = (path: string, params: string, pathName: string) => {
    const [usersData, setUsersData] = useState<IUser[]>([]);
    const [recipesData, setRecipesData] = useState<IRecipe[]>([]);
    const [reject, setReject] = useState<boolean>(false);
    const [waiter, setWaiter] = useState<string>(params);
    const getCookie = useGetCookie();

    useEffect(() => {
        const handler = setTimeout(() => {
            setWaiter(params);
        }, 200);

        return () => {
            clearTimeout(handler);
        };
    }, [params]);

    useEffect(() => {

        if (!waiter.trim()) {
            setUsersData([]);
            setRecipesData([]);
            return;
        }

        if (getCookie('login') && getCookie('login') === 'true'){
            const fetchData = async () => {

                const query = isNaN(+waiter)
                    ? `search?type=${path}&params=${waiter}`
                    : `search?type=${path}&id=${+waiter}`;

                const response = await allRoute<IResponse<IUser[]> | IResponse<IRecipe[]> | string>(query);
                if (response.data === 'reject') {
                    setReject(true);
                    setTimeout(() => {
                        setReject(false)
                    }, 200)
                }

                if (Array.isArray(response.data)) {
                    if (pathName === "/users") setUsersData(response.data as IUser[]);
                    if (pathName === "/recipes") setRecipesData(response.data as IRecipe[]);
                }
            };
            fetchData();
        }

    }, [getCookie, pathName, waiter, path]);

    return {usersData, recipesData, reject};
}