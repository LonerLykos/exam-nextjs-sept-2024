import React from 'react';
import {Metadata} from "next";


export const metadata: Metadata = {
    title: "RecipesPage metadata",
}

type Props = { children: React.ReactNode };
const RecipesPage = ({children}: Props) => {
    return (
        <>
            {children}
        </>
    );
};

export default RecipesPage;