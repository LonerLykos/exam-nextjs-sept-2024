'use client';

import classNames from "classnames";
import Link from "next/link";
import {LogoutButton} from "@/components/menu/log-out-button/LogoutButton";
import {IUserInfoWithTokens} from "@/models/user-with-token-model/IUserInfoWithToken";
import {usePathname} from "next/navigation";

interface Props {
    userWithToken: IUserInfoWithTokens | null;
}

export const ClientMenu = ({userWithToken}: Props) => {

    const location = usePathname();
    const isActive = (path: string) => location === path;

    return (
        <>
            {userWithToken ? (
                <>
                    <img src={userWithToken.image} alt="userPhoto"/>
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

        </>
    );
};
