import {allService, refresh} from "@/api/api.services";
import {NextResponse} from "next/server";
import {IUser} from "@/models/users-model/IUser";
import {IRecipes} from "@/models/recipes-model/IRecipes";
import {IResponse} from "@/models/response-model/IResponse";
import {filterData} from "@/app/api/search/util/search-util";


export const searchRequest = async (subject: string, essence: string, token: string) => {

    const condition = parseInt(essence);
    if (condition) {
        try {

            const data = await allService<IResponse<IRecipes[]> | IResponse<IUser[]>>(subject, '', 'Authorization', token);
            if(subject.includes('users')){
                const filtredData = filterData(data.users, condition);
                return NextResponse.json(filtredData);
            }else if(subject.includes('recipes')){
                const filtredData = filterData(data.recipes, condition);
                return NextResponse.json(filtredData);
            }


        } catch {
            try {

                const newToken = await refresh();

                const headerNew = `Bearer ${newToken}`
                const data = await allService<IResponse<IRecipes[]> | IResponse<IUser[]>>(subject, '', 'Authorization', headerNew);

                if(subject.includes('users')){
                    const filtredData = filterData(data.users, condition);
                    return NextResponse.json(filtredData);
                }else if(subject.includes('recipes')){
                    const filtredData = filterData(data.recipes, condition);
                    return NextResponse.json(filtredData);
                }

                if (!data) {
                    return NextResponse.json('error');
                }
            } catch {
                return NextResponse.json('error');
            }
        }
    } else if (!condition) {
        try {

            const data = await allService<IResponse<IRecipes[]> | IResponse<IUser[]>>(subject, '', 'Authorization', token);
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

                const headerNew = `Bearer ${newToken}`
                const data = await allService<IResponse<IRecipes[]> | IResponse<IUser[]>>(subject, '', 'Authorization', headerNew);

                if (subject.includes('users')) {
                    const filtredData = filterData(data.users, essence, subject);
                    return NextResponse.json(filtredData);
                } else if (subject.includes('recipes')) {
                    const filtredData = filterData(data.recipes, essence, subject);
                    return NextResponse.json(filtredData);
                }

                if (!data) {
                    return NextResponse.json('error');
                }
            } catch {
                return NextResponse.json('error');
            }
        }
    }else{
        return NextResponse.json('error');
    }
}

