'use client';
import "./RecipeDetails.scss"
import classNames from "classnames";
import {usePathname, useRouter} from "next/navigation";
import {taskProcessor} from "@/components/recipes/recipe-filter/util/util";
import {useEffect, useState} from "react";
import {IRecipe} from "@/models/recipes-model/IRecipe";
import {allRoute, logout} from "@/services/route.services";
import {IUser} from "@/models/users-model/IUser";
import Link from "next/link";
import {IRecipeWithUser} from "@/models/rsponse-for-recipe-with-user/IRecipeWithUser";
import Image from "next/image";


export const RecipeDetails = () => {

    const path = usePathname();
    const {type, tags} = taskProcessor(path || '')
    const parameters = `?type=${type}&tag=${tags[0]}&typeTag=${tags[1]}`;
    const router = useRouter();
    const [recipe, setRecipe] = useState<IRecipe>();
    const [user, setUser] = useState<IUser>();

    useEffect(() => {

        const fetchData = async () => {
            const {data} = await allRoute<IRecipeWithUser | string>(`slug-data${parameters}`);

            if (data === 'reject') {
                const response = await logout();
                if (response === 200) {
                    router.push('/login');
                }

            } else if (typeof data === 'object') {
                setRecipe(data.recipe);
                setUser(data.user);
            }
        };

        fetchData();

    }, [router, path, parameters]);

    return (
        <div className={classNames('recipe-details-wrapper')}>
            {recipe && user &&
                <>
                    <h2>{recipe.name} edited by {<span><Link
                        href={`/users/id=${user.id}`}>{user.firstName} {user.lastName}</Link></span>}</h2>
                    <div className={classNames('info-wrapper')}>
                        <Image src={recipe.image} alt={recipe.name} width='600' height='600'/>
                        <section>
                            <div className={classNames('tags-and-special-container')}>
                                <ul>Special info:
                                    <li>Prepare time: {recipe.prepTimeMinutes} mins</li>
                                    <li>Cook time: {recipe.cookTimeMinutes} mins</li>
                                    <li>Servings: {recipe.servings}</li>
                                    <li>Difficulty: {recipe.difficulty}</li>
                                    <li>Calories Rep Serving: {recipe.caloriesPerServing}</li>
                                </ul>
                                <ul>Tags:
                                    {recipe.tags.map((tag: string, index) => <li key={index}>{tag} </li>)}
                                </ul>
                            </div>
                            <div className={classNames('ingredients-container')}>
                                <ul>Ingredients:
                                    {recipe.ingredients.map((ingredient: string, index) => <li
                                        key={index}>{ingredient}</li>)}
                                </ul>
                            </div>
                            <div className={classNames('instructions-container')}>
                                <h3>Instruction: </h3>
                                {recipe.instructions.map((text: string, index) => <p
                                    key={index}>{text}</p>)}
                            </div>
                        </section>
                    </div>
                </>
            }
        </div>
    );
};
