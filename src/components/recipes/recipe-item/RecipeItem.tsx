'use client';
import {FC} from "react";
import "./RecipeItem.scss"
import classNames from "classnames";
import {IRecipe} from "@/models/recipes-model/IRecipe";
import {useRouter} from "next/navigation";
import Image from "next/image";

interface Props {
    item: IRecipe;
}

export const RecipeItem: FC<Props> = ({item}) => {

    const router = useRouter();

    const recipeDetails = () => {
        router.push(`/recipes/id=${item.id}`)
    }

    const handlerFilter = (tag:string) => {
        router.push(`/recipes/tag=${tag}`)
    }

    return (
        <div className={classNames('recipe-item-wrapper')}>
            <Image src={item.image} alt={item.name} width='300' height='300'/>
            <div className={classNames('recipe-info')}>
                <h2>{item.name}</h2>
                <ul>Tags: {item.tags.map((tag: string, index: number) => <li key={index}>
                    <button onClick={() => {
                        handlerFilter(tag)
                    }}>{tag}</button>
                </li>)}</ul>
                <button className={classNames('info')} onClick={recipeDetails}>Info</button>
            </div>
        </div>
    );
};
