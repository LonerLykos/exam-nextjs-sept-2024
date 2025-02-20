import React from 'react';
import {Metadata} from "next";


export const metadata: Metadata = {
    title: "UsersPage metadata",
}

type Props = { children: React.ReactNode };
const UsersPage = ({children}: Props) => {
    return (
        <>
            {children}
        </>
    );
};

export default UsersPage;