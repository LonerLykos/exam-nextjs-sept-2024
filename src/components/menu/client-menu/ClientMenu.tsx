'use client';

import "./ClientMenu.scss"
import classNames from "classnames";
import Link from "next/link";
import {LogoutButton} from "@/components/menu/log-out-button/LogoutButton";
import {IUserInfoWithTokens} from "@/models/user-with-token-model/IUserInfoWithToken";
import {usePathname} from "next/navigation";
import {useGetCookie} from "cookies-next/client";
import Image from "next/image";

interface Props {
    userWithToken: IUserInfoWithTokens | null;
}

export const ClientMenu = ({userWithToken}: Props) => {

    const location = usePathname();
    const isActive = (path: string) => location === path;
    const getCookie = useGetCookie();
    const status = JSON.parse(getCookie('login') || 'false');


    return (
        <div className={classNames('menu-wrapper', {'login': status}, {'unlogin': !status})}>
            {userWithToken && status ? (
                <>
                    <Image src={userWithToken.image} alt='userPhoto' width='50' height='50' priority/>
                    <ul className={classNames('navigate')}>
                        <li className={classNames('pages')}>
                            <LogoutButton/>
                        </li>
                        <li className={classNames('pages', { 'active': isActive('/') })}>
                            <Link href={'/'}>Main</Link>
                        </li>
                        <li className={classNames('pages', { 'active': isActive('/users') })}>
                            <Link href={'/users'}>Users</Link>
                        </li>
                        <li className={classNames('pages', { 'active': isActive('/recipes') })}>
                            <Link href={'/recipes'}>Recipes</Link>
                        </li>
                    </ul>
                </>
            ) : (
                <li className={classNames('pages', {'active': isActive('/login')})}><Link href={'/login'}>Login</Link></li>
            )}

        </div>
    );
};
