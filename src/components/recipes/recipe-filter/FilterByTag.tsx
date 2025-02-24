'use client';
import "./FiltredByTag.scss"
import classNames from "classnames";
import {allRoute, logout} from "@/services/route.services";
import {useEffect, useState} from "react";
import {IResponse} from "@/models/response-model/IResponse";
import {IRecipe} from "@/models/recipes-model/IRecipe";
import {taskProcessor} from "@/components/recipes/recipe-filter/util/util";
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import {RecipeItem} from "@/components/recipes/recipe-item/RecipeItem";
import {Pagination} from "@/components/pagination/Pagination";

export const FilterByTag = () => {

    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString()
    const params = searchParams?.get('page')
    const page = params ? parseInt(params) : 1;
    const itemsPerPage = 2;
    const skip = (page - 1) * itemsPerPage;
    const path = usePathname();
    const {type, tags} = taskProcessor(path || '');
    const paginationTag = `${tags[1]}`;
    const parameters = `?type=${type}&tag=${tags[0]}&typeTag=${tags[1]}&skip=${skip}&limit=${itemsPerPage}`;
    const [data, setData] = useState<IResponse<IRecipe[]>>();
    const router = useRouter();

    useEffect(() => {

        const fetchData = async () => {
            const {data} = await allRoute<IResponse<IRecipe[]> | string>(`slug-data${parameters}`);

            if (data === 'reject') {
                const response = await logout();
                if (response === 200) {
                    router.push('/login');
                }

            } else if (typeof data === 'object') {
                setData(data);
            }
        };

        fetchData();

    }, [searchParamsString, parameters, router]);


    return (
        <div className={classNames('filtred-info')}>
            <div className={classNames('filtred-recipes-list-wrapper')}>
                {data && data.recipes.map((recipe) => <RecipeItem key={recipe.id} item={recipe}/>)}
            </div>
            <Pagination
                totalItems={data ? data.total : 0}
                itemsPerPage={itemsPerPage}
                currentPage={page}
                type={type}
                tag={paginationTag}
            />
        </div>
    );
};
