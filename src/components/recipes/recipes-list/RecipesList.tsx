'use client';
import classNames from "classnames";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import "./RecipesList.scss";
import {IResponse} from "@/models/response-model/IResponse";
import {IRecipes} from "@/models/recipes-model/IRecipes";
import {RecipeItem} from "@/components/recipes/recipe-item/RecipeItem";
import {Pagination} from "@/components/pagination/Pagination";
import {allRoute} from "@/api/route.services";

export const RecipesList = () => {

    const searchParams = useSearchParams();
    const params = searchParams?.get('page')
    const page = params ? parseInt(params) : 1;
    const itemsPerPage = 4;
    const skip = (page - 1) * itemsPerPage;
    const type = 'recipes';

    const [data, setData] = useState<IResponse<IRecipes[]>>();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await allRoute(`all-data?limit=${itemsPerPage}&skip=${skip}&type=${type}`);

                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, [searchParams.toString()]);





    return (
        <div className={classNames('recipes-all-info')}>
            <div className={classNames('recipes-list-wrapper')}>
                {data ? data.recipes.map((item: IRecipes) => <RecipeItem key={item.id} item={item}/>) : null}
            </div>
            <Pagination
                totalItems={data ? data.total : 0}
                itemsPerPage={itemsPerPage}
                currentPage={page}
                type={type}
            />
        </div>
    );
};
