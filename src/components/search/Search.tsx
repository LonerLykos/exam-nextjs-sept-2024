'use client';
import classNames from "classnames";
import "./Search.scss";
import {useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {schema} from "@/validator/search.validator";
import {IRecipes} from "@/models/recipes-model/IRecipes";
import {IUser} from "@/models/users-model/IUser";
import {usePathname, useRouter} from "next/navigation";
import {allRoute} from "@/api/route.services";

interface ISearchData {
    searching: string;
}


export const Search = () => {

    const {handleSubmit, register, formState: {errors}, watch, setValue, reset}
        = useForm<ISearchData>({mode: 'onChange', resolver: zodResolver(schema)});

    const searchValue = watch("searching", "");
    const pathName = usePathname();
    const router = useRouter();

    const [users, setUsers] = useState<IUser[]>();
    const [recipes, setRecipes] = useState<IRecipes[]>();

    const handleSearch = async (searchingData: ISearchData) => {
        const params = searchingData.searching.trim();
        const path = pathName.slice(1);


        switch (pathName) {
            case "/users":
                if (params.length > 0) {
                    if ((+params) && (+params) > 0) {
                        const data = await allRoute(`search?type=${path}&id=${+params}`);

                        if (Array.isArray(data)) {
                            console.log('test')
                            setUsers(data);
                        } else if (data === 'error') {
                            router.push('/login');
                        }

                    } else {

                        const data = await allRoute(`search?type=${path}&params=${params}`);
                        console.log('API Response', data)
                        if (Array.isArray(data)) {
                            console.log('test')
                            setUsers(data);
                        } else if (data === 'error') {
                            router.push('/login');
                        }
                    }
                }
                break

            case "/recipes":
                if (params.length > 0) {
                    if ((+params) && (+params) > 0) {

                        const data = await allRoute(`search?type=${path}&id=${+params}`);
                        if (Array.isArray(data)) {
                            setRecipes(data);
                        } else {
                            setRecipes([]);
                        }

                    } else {
                        const data = await allRoute(`search?type=${path}&params=${params}`);
                        console.log('API Response', data)
                        if (Array.isArray(data)) {
                            console.log('test')
                            setRecipes(data);
                        } else if (data === 'error') {
                            router.push('/login');
                        }
                    }
                    break
                }
        }
    };

    useEffect(() => {
        handleSearch({searching: searchValue});
    }, [searchValue, pathName]);

    const handleBlur = () => {

        setTimeout(() => {
            setValue("searching", "");
            reset();
            setUsers([]);
            setRecipes([]);
        }, 200);
    };


    const handleChoise = (type: string, item: IRecipes | IUser) => {
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
                    <form className={classNames('form-search')} onChange={handleSubmit(handleSearch)}
                          onBlur={handleBlur}>
                        <label>
                            <input type="text" {...register('searching')}/>
                        </label>
                        <p className={!errors.searching ? 'hide' : 'view'}>{!errors.searching ? '' : errors.searching.message}</p>
                    </form>
                    <div
                        className={classNames({'find-list': (users && users.length > 0 || recipes && recipes.length > 0)})}>
                        {pathName === "/users" && users && users.length > 0 && (
                            <ul>
                                {users.map(user => (
                                    <li key={user.id}>
                                        <button onClick={() => handleChoise('user', user)}>
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
                                        <button onClick={() => handleChoise('recipe', recipe)}>
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

