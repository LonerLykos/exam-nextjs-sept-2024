import {IRecipes} from "@/models/recipes-model/IRecipes";
import {IUser} from "@/models/users-model/IUser";


export const helperTags = (searchParams: URLSearchParams) => {

    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const params = searchParams.get('params')
    const subject = `/${type}`;

    if (id) {
        const subject = `/${type}?limit=0`;
        return {subject: subject, essence: id}
    }else if (params){
        const subject = `/${type}?limit=0`
        return {subject: subject, essence: params}
    }
    return {subject: '', essence: ''};
};

export const filterData = (data: IRecipes[] | IUser[], condition: number | string, subject?:string) => {
    if (typeof condition === 'number'){
        return data.filter((item) => item.id.toString().includes(condition.toString()));
    }else {
        if (subject?.includes('users')){
            const userData = data as IUser[];
            const filterFirsName = userData.filter((item) => item.firstName.toLowerCase().includes(condition.toLowerCase()));
            const filterLastName = userData.filter((item) => item.lastName.toLowerCase().includes(condition.toLowerCase()));
            return [...new Map([...filterFirsName, ...filterLastName].map(user => [user.id, user])).values()];
        }else if (subject?.includes('recipes')){
            const userData = data as IRecipes[];
            const filterName = userData.filter((item) => item.name.toLowerCase().includes(condition.toLowerCase()));
            const filterTag = userData.filter((item) => item.tags.some((tag) => tag.toLowerCase().includes(condition.toLowerCase())));
            return [...new Map([...filterName, ...filterTag].map(user => [user.id, user])).values()];
        }
    }

}


