import {RecipesList} from "@/components/recipes/recipes-list/RecipesList";
import {Suspense} from "react";

const RecipesListPage = () => {
    return (
        <div>
            <Suspense>
                <RecipesList/>
            </Suspense>
        </div>
    );
};

export default RecipesListPage;