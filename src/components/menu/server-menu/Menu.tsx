import classNames from "classnames";
import "./Menu.scss"
import {getCookie} from "cookies-next/server";
import {cookies} from "next/headers";
import {IUserInfoWithTokens} from "@/models/user-with-token-model/IUserInfoWithToken";
import {ClientMenu} from "@/components/menu/client-menu/ClientMenu";

export const Menu = async () => {

    const validUser = await getCookie('authUser', {cookies});
    const userWithToken: IUserInfoWithTokens | null = validUser ? JSON.parse(validUser) : null;


    return (

        <div className={classNames('menu-wrapper', {'login': userWithToken}, {'unlogin': !userWithToken})}>
            <ClientMenu userWithToken={userWithToken}/>
        </div>
    )
};
