import {allService, refresh} from "@/api/api.services";
import {NextResponse} from "next/server";
import {filterRecipe} from "@/app/api/slug-data/utils/slug-util";
import {IUser} from "@/models/users-model/IUser";
import {IRecipes} from "@/models/recipes-model/IRecipes";
import {IResponse} from "@/models/response-model/IResponse";

export const myRequest = async (type: string, params: string, token: string) => {

    if (params.includes('?')) {
        try {

            const data = await allService(type, params, 'Authorization', token);
            return NextResponse.json(data);
        } catch {
            try {
                const newToken = await refresh();

                if (!newToken) {
                    console.log('test');
                }

                const headerNew = `Bearer ${newToken}`
                const data = await allService(type, params, 'Authorization', headerNew);

                if (!data) {
                    return NextResponse.json({message: 'Повторний запит не успішний'}, {status: 400});
                }
                return NextResponse.json(data);
            } catch {
                return NextResponse.json({message: 'Помилка оновлення токену'}, {status: 500});
            }
        }
    } else if (params.includes('/')) {
        try {
            if (type.includes('recipes')) {
                const recipe = await allService<IRecipes>(type, params, 'Authorization', token);
                const usId = recipe.userId;
                const user = await allService<IUser>('/users', `/${usId}`, 'Authorization', token);
                return NextResponse.json({recipe, user});
            } else if (type.includes('user')) {

                const user = await allService<IUser>(type, params, 'Authorization', token);
                const recipes = await allService<IResponse<IRecipes[]>>('/recipes', '?limit=0', 'Authorization', token);
                const recipesByUser = filterRecipe(user, recipes);
                return NextResponse.json({recipesByUser, user});
            }
        } catch {
            try {
                const newToken = await refresh();

                if (!newToken) {
                    console.log('test');
                }

                const headerNew = `Bearer ${newToken}`
                if (type.includes('recipes')) {
                    const recipe = await allService<IRecipes>(type, params, 'Authorization', headerNew);
                    const usId = recipe.userId;
                    const user = await allService<IUser>('/users', `/${usId}`, 'Authorization', headerNew);


                    if (!recipe || !user) {
                        return NextResponse.json({message: 'Повторний запит не успішний'}, {status: 400});
                    }
                    return NextResponse.json({recipe, user});

                } else if (type.includes('user')) {
                    const user = await allService<IUser>(type, params, 'Authorization', headerNew);
                    const recipes = await allService<IResponse<IRecipes[]>>('/recipes', '', 'Authorization', headerNew);
                    const recipesByUser = filterRecipe(user, recipes);

                    if (!recipesByUser || !user) {
                        return NextResponse.json({message: 'Повторний запит не успішний'}, {status: 400});
                    }

                    return NextResponse.json({recipesByUser, user});
                }

            } catch {
                return NextResponse.json({message: 'Помилка оновлення токену'}, {status: 333});
            }
        }
    } else {
        return NextResponse.json({message: 'Params not foud'}, {status: 500});
    }
}

