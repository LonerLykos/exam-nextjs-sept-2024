import {IRecipe} from "@/models/recipes-model/IRecipe";
import {IUser} from "@/models/users-model/IUser";


export const helperTags = (searchParams: URLSearchParams) => {

    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const params = searchParams.get('params')

    if (id) {
        const subject = `/${type}?limit=0`;
        return {subject: subject, essence: id}
    }else if (params){
        const subject = `/${type}?limit=0`
        return {subject: subject, essence: params}
    }
    return {subject: '', essence: ''};
};

export const filterData = (data: IRecipe[] | IUser[], essence: string, subject:string) => {

    const condition = parseInt(essence);

    if (condition){
        return data.filter((item) => item.id.toString().includes(condition.toString()));
    }else {
        if (subject?.includes('users')){
            const userData = data as IUser[];
            const filterFirsName = userData.filter((item) => item.firstName.toLowerCase().includes(essence.toLowerCase()));
            const filterLastName = userData.filter((item) => item.lastName.toLowerCase().includes(essence.toLowerCase()));
            return [...new Map([...filterFirsName, ...filterLastName].map(user => [user.id, user])).values()].sort((a, b) => a.id - b.id);
        }else if (subject?.includes('recipes')){
            const userData = data as IRecipe[];
            const filterName = userData.filter((item) => item.name.toLowerCase().includes(essence.toLowerCase()));
            const filterTag = userData.filter((item) => item.tags.some((tag) => tag.toLowerCase().includes(essence.toLowerCase())));
            return [...new Map([...filterName, ...filterTag].map(user => [user.id, user])).values()].sort((a, b) => a.id - b.id);
        }
    }

}


