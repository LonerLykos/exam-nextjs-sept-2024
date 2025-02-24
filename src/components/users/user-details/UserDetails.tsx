'use client';
import "./UserDetails.scss"
import classNames from "classnames";
import {usePathname, useRouter} from "next/navigation";
import {taskProcessor} from "@/components/recipes/recipe-filter/util/util";
import {useEffect, useState} from "react";
import {IRecipe} from "@/models/recipes-model/IRecipe";
import {allRoute, logout} from "@/services/route.services";
import {IUserWithRecipes} from "@/models/response-for-user-with-recipes/IUserWithRecipes";
import {IUser} from "@/models/users-model/IUser";
import Link from "next/link";
import Image from "next/image";

export const UserDetails = () => {

    const path = usePathname();
    const {type, tags} = taskProcessor(path || '')
    const parameters = `?type=${type}&tag=${tags[0]}&typeTag=${tags[1]}`;

    const [user, setUser] = useState<IUser>();
    const [recipes, setRecipes] = useState<IRecipe[]>();
    const router = useRouter();

    useEffect(() => {

        const fetchData = async () => {
            const {data} = await allRoute<IUserWithRecipes | string>(`slug-data${parameters}`);

            if (data === 'reject') {
                const response = await logout();
                if (response === 200) {
                    router.push('/login');
                }

            } else if (typeof data === 'object') {
                setRecipes(data.recipesByUser);
                setUser(data.user);
            }

        };

        fetchData();

    }, [router, path, parameters,]);

    return (
        <div className={classNames('user-details-wrapper')}>
            {user && recipes &&
                <>
                    <h2>{user.firstName} {user.lastName}</h2>
                    <Image src={user.image} alt={user.firstName} width='128' height='128'/>
                    <p className={classNames('italic')}><span>Email:</span> {user.email}</p>
                    <p className={classNames('italic')}><span>Phone:</span> {user.phone}</p>
                    <p><span>Address:</span> {user.address.address}</p>
                    <p><span>Birthday:</span> {user.birthDate}</p>
                    <p><span>University:</span> {user.university}</p>
                    <p><span>Role:</span> {user.role}</p>
                    <p><span>Gender:</span> {user.gender}</p>
                    {recipes.length > 0 ? (
                        <ul>User recipes:
                            {recipes.map((recipe: IRecipe) => <li key={recipe.id}><Link
                                href={`/recipes/id=${recipe.id}`} replace>{recipe.name}</Link></li>)}
                        </ul>
                    ) : (<p>Current user haven`t any recipes</p>)}
                </>
            }
        </div>
    );
};
