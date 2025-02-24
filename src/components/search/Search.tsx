'use client';
import classNames from "classnames";
import "./Search.scss";
import {useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {schema} from "@/validator/search.validator";
import {IRecipe} from "@/models/recipes-model/IRecipe";
import {IUser} from "@/models/users-model/IUser";
import {usePathname, useRouter} from "next/navigation";
import {useSwitcher} from "@/components/search/util/useSwitcher";
import {logout} from "@/services/route.services";
import {useGetCookie} from "cookies-next/client";

interface ISearchData {
    searching: string;
}


export const Search = () => {

    const router = useRouter();
    const getCookie = useGetCookie();

    useEffect(() => {
        if (!getCookie('login') || getCookie('login') === 'false') {
            router.push('/login');
        }
    }, [router ,getCookie]);

    const {handleSubmit, register, formState: {errors}, watch, setValue, reset}
        = useForm<ISearchData>({mode: 'onChange', resolver: zodResolver(schema)});
    const searchValue = watch("searching", "");
    const pathName = usePathname();

    const [users, setUsers] = useState<IUser[]>();
    const [recipes, setRecipes] = useState<IRecipe[]>();


    const {usersData, recipesData, reject} = useSwitcher(pathName.slice(1), searchValue, pathName);

    useEffect(() => {
        if (usersData) setUsers(usersData);
        if (recipesData) setRecipes(recipesData);

        if (reject) {
            const loginOut = async () => {
                const response = await logout();
                if (response === 200) {
                    reset();
                    router.push('/login');
                }
            };
            loginOut();

        }
    }, [reset ,router, usersData, recipesData, reject]);


    const handleBlur = () => {

        setTimeout(() => {
            setValue("searching", "");
            reset();
            setUsers([]);
            setRecipes([]);
        }, 200);
    };


    const handleChoice = (type: string, item: IRecipe | IUser) => {
        if (type === 'user') {
            router.push(`/users/id=${item.id}`);
        } else {
            router.push(`/recipes/id=${item.id}`);
        }
    };

    return (
        <>
            {(pathName === "/users" || pathName === "/recipes") && (
                <div className={classNames('form-wrapper')}>
                    <h3>Search</h3>
                    <form className={classNames('form-search')} onChange={handleSubmit(() => {
                    })}
                          onBlur={handleBlur}>
                        <label>
                            <input type='text' autoComplete='off' {...register('searching')}/>
                        </label>
                        <p className={!errors.searching ? 'hide' : 'view'}>{!errors.searching ? '' : errors.searching.message}</p>
                    </form>
                    <div
                        className={classNames({'find-list': (users && users.length > 0 || recipes && recipes.length > 0)})}>
                        {pathName === "/users" && users && users.length > 0 && (
                            <ul>
                                {users.map(user => (
                                    <li key={user.id}>
                                        <button onClick={() => handleChoice('user', user)}>
                                            {user.firstName} {user.lastName} with id: {user.id}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {pathName === "/recipes" && recipes && recipes.length > 0 && (
                            <ul>
                                {recipes.map(recipe => (
                                    <li key={recipe.id}>
                                        <button onClick={() => handleChoice('recipe', recipe)}>
                                            {recipe.name} with id: {recipe.id}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

