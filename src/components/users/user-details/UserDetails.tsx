'use client';
import "./UserDetails.scss"
import classNames from "classnames";
import {usePathname} from "next/navigation";
import {taskProcessor} from "@/components/recipes/recipe-filter/util/util";
import {useEffect, useState} from "react";
import {IRecipes} from "@/models/recipes-model/IRecipes";
import {IUser} from "@/models/users-model/IUser";
import {allRoute} from "@/api/route.services";
import Link from "next/link";

export const UserDetails = () => {

    const path = usePathname();
    const {type, tags} = taskProcessor(path || '')
    const parameters = `?type=${type}&tag=${tags[0]}&typeTag=${tags[1]}`;
    console.log(parameters);

    const [recipes, setRecipes] = useState<IRecipes[]>();
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {recipesByUser, user} = await allRoute(`slug-data${parameters}`);

                setRecipes(recipesByUser);
                setUser(user);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [path]);





    return (
        <div className={classNames('user-details-wrapper')}>
            { user && recipes &&
                <>
                <h2>{user.firstName} {user.lastName}</h2>
                <img src={user.image} alt={user.firstName}/>
                <p className={classNames('italic')}><span>Email:</span> {user.email}</p>
                <p className={classNames('italic')}><span>Phone:</span> {user.phone}</p>
                <p><span>Address:</span> {user.address.address}</p>
                <p><span>Birthday:</span> {user.birthDate}</p>
                <p><span>University:</span> {user.university}</p>
                <p><span>Role:</span> {user.role}</p>
                <p><span>Gender:</span> {user.gender}</p>
                {recipes.length > 0 ? (
                    <ul>User recipes:
                        {recipes.map((recipe: IRecipes) => <li key={recipe.id}><Link href={`/recipes/id=${recipe.id}`} replace>{recipe.name}</Link></li>)}
                    </ul>
                ) : (<p>Current user haven`t any recipes</p>)}
            </>
            }

        </div>
    );
};
