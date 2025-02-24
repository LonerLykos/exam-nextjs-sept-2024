import {allService, refresh} from "@/services/api.services";
import {NextResponse} from "next/server";
import {filterRecipe} from "@/app/api/slug-data/utils/slug-util";
import {IUser} from "@/models/users-model/IUser";
import {IRecipe} from "@/models/recipes-model/IRecipe";
import {IResponse} from "@/models/response-model/IResponse";

export const myRequest = async (type: string, params: string, token: string) => {

    if (params.includes('?')) {
        try {
            const data = await allService(type, params, 'Authorization', token);
            return NextResponse.json(data);
        } catch {
            try {
                const newToken = await refresh();

                const headerNew = `Bearer ${newToken}`
                const data = await allService<IResponse<IRecipe[]>>(type, params, 'Authorization', headerNew);

                return NextResponse.json(data);
            } catch {
                const response = NextResponse.json('reject')
                response.cookies.set("error", "error");
                return response;
            }
        }
    } else if (params.includes('/')) {
        try {
            if (type.includes('recipes')) {
                const recipe = await allService<IRecipe>(type, params, 'Authorization', token);
                const usId = recipe.userId;
                const user = await allService<IUser>('/users', `/${usId}`, 'Authorization', token);
                return NextResponse.json({recipe, user});
            } else if (type.includes('user')) {

                const user = await allService<IUser>(type, params, 'Authorization', token);
                const recipes = await allService<IResponse<IRecipe[]>>('/recipes', '?limit=0', 'Authorization', token);
                const recipesByUser = filterRecipe(user, recipes);
                return NextResponse.json({recipesByUser, user});
            }
        } catch {
            try {
                const newToken = await refresh();

                const headerNew = `Bearer ${newToken}`
                if (type.includes('recipes')) {
                    const recipe = await allService<IRecipe>(type, params, 'Authorization', headerNew);
                    const usId = recipe.userId;
                    const user = await allService<IUser>('/users', `/${usId}`, 'Authorization', headerNew);


                    if (!recipe || !user) {
                        const response = NextResponse.json('reject')
                        response.cookies.set("error", "error");
                        return response;
                    }
                    return NextResponse.json({recipe, user});

                } else if (type.includes('user')) {
                    const user = await allService<IUser>(type, params, 'Authorization', headerNew);
                    const recipes = await allService<IResponse<IRecipe[]>>('/recipes', '', 'Authorization', headerNew);
                    const recipesByUser = filterRecipe(user, recipes);

                    if (!recipesByUser || !user) {
                        const response = NextResponse.json('reject')
                        response.cookies.set("error", "error");
                        return response;
                    }

                    return NextResponse.json({recipesByUser, user});
                }else {
                    const response = NextResponse.json('reject')
                    response.cookies.set("error", "error");
                    return response;
                }

            } catch {
                const response = NextResponse.json('reject')
                response.cookies.set("error", "error");
                return response;
            }
        }
    } else {
        const response = NextResponse.json('reject')
        response.cookies.set("error", "error");
        return response;
    }
}

