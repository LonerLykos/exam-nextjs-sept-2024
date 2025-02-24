import type {Metadata} from "next";
import "./globals.scss";
import {ReactNode} from "react";
import {Menu} from "@/components/menu/server-menu/Menu";
import {Search} from "@/components/search/Search";


export const metadata: Metadata = {
    title: "My site",
    description: "App for checking users and recipes",
    icons: {
        icon: "/favicon/favicon-32x32.png",
        shortcut: "/favicon/favicon.ico",
        apple: "/favicon/apple-touch-icon.png",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <Menu/>
        <Search/>
        {children}
        </body>
        </html>
    );
}
