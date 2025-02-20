'use client';
import "./RecipeDetails.scss"
import classNames from "classnames";
import {usePathname} from "next/navigation";
import {taskProcessor} from "@/components/recipes/recipe-filter/util/util";
import {useEffect, useState} from "react";
import {IRecipes} from "@/models/recipes-model/IRecipes";
import {allRoute} from "@/api/route.services";
import {IUser} from "@/models/users-model/IUser";
import Link from "next/link";


export const RecipeDetails = () => {

    const path = usePathname();
    const {type, tags} = taskProcessor(path || '')
    const parameters = `?type=${type}&tag=${tags[0]}&typeTag=${tags[1]}`;

    const [recipe, setRecipe] = useState<IRecipes>();
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {recipe, user} = await allRoute(`slug-data${parameters}`);

                setRecipe(recipe);
                setUser(user);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [path]);

    return (
        <div className={classNames('recipe-details-wrapper')}>
            {recipe && user &&
                <>
                    <h2>{recipe.name} edited by {<span><Link href={`/users/id=${user.id}`}>{user.firstName} {user.lastName}</Link></span>}</h2>
                    <div className={classNames('info-wrapper')}>
                        <img src={recipe.image} alt={recipe.name}/>
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
