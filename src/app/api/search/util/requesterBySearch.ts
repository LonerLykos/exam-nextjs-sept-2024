import {allService, refresh} from "@/services/api.services";
import {NextResponse} from "next/server";
import {IUser} from "@/models/users-model/IUser";
import {IRecipe} from "@/models/recipes-model/IRecipe";
import {IResponse} from "@/models/response-model/IResponse";
import {filterData} from "@/app/api/search/util/search-util";

export const searchRequest = async (subject: string, essence: string, token: string) => {
    try {

        const data = await allService<IResponse<IRecipe[]> | IResponse<IUser[]>>(subject, '', 'Authorization', token);
        if (subject.includes('users')) {
            const filtredData = filterData(data.users, essence, subject);
            return NextResponse.json(filtredData);
        } else if (subject.includes('recipes')) {
            const filtredData = filterData(data.recipes, essence, subject);
            return NextResponse.json(filtredData);
        }


    } catch {
        try {
            const newToken = await refresh();
            const headerNew = `Bearer ${newToken.accessToken}`;

            const data = await allService<IResponse<IRecipe[]> | IResponse<IUser[]>>(subject, '', 'Authorization', headerNew);
            if (subject.includes('users')) {
                const filtredData = filterData(data.users, essence, subject);
                return NextResponse.json(filtredData);
            } else if (subject.includes('recipes')) {
                const filtredData = filterData(data.recipes, essence, subject);
                return NextResponse.json(filtredData);
            }

        } catch {
    const response = NextResponse.json('reject')
    response.cookies.set("error", "error");
    return response;
        }
    }


}

