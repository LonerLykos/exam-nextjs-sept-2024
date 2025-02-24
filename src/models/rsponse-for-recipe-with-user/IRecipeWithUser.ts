import {IRecipe} from "@/models/recipes-model/IRecipe";
import {IUser} from "@/models/users-model/IUser";

export interface IRecipeWithUser {
    recipe: IRecipe;
    user: IUser;
}