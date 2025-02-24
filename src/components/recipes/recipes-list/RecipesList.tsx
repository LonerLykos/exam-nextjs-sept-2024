'use client';
import classNames from "classnames";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import "./RecipesList.scss";
import {IResponse} from "@/models/response-model/IResponse";
import {IRecipe} from "@/models/recipes-model/IRecipe";
import {RecipeItem} from "@/components/recipes/recipe-item/RecipeItem";
import {Pagination} from "@/components/pagination/Pagination";
import {allRoute, logout} from "@/services/route.services";

export const RecipesList = () => {

    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();
    const params = searchParams?.get('page')
    const page = params ? parseInt(params) : 1;
    const itemsPerPage = 4;
    const skip = (page - 1) * itemsPerPage;
    const type = 'recipes';
    const router = useRouter();
    const [data, setData] = useState<IResponse<IRecipe[]>>();

    useEffect(() => {

        const fetchData = async () => {
            const {data} = await allRoute<IResponse<IRecipe[]> | string>(`all-data?limit=${itemsPerPage}&skip=${skip}&type=${type}`);

            if (typeof data === 'object') {
                setData(data as IResponse<IRecipe[]>);
            } else if (data === 'reject') {
                const response = await logout();
                if (response === 200) {
                    router.push('/login');
                }
            }

        };
        fetchData();

    }, [searchParamsString, router, skip]);

    return (
        <div className={classNames('recipes-all-info')}>
            <div className={classNames('recipes-list-wrapper')}>
                {data ? data.recipes.map((item: IRecipe) => <RecipeItem key={item.id} item={item}/>) : null}
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
