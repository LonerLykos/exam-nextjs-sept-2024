'use client';
import classNames from "classnames";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import "./UsersList.scss";
import {IUser} from "@/models/users-model/IUser";
import {IResponse} from "@/models/response-model/IResponse";
import {Pagination} from "@/components/pagination/Pagination";
import {UserItem} from "@/components/users/user-item/UserItem";
import {allRoute, logout} from "@/services/route.services";

export const UsersList = () => {

    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();
    const params = searchParams?.get('page')
    const page = params ? parseInt(params) : 1;
    const itemsPerPage = 16;
    const skip = (page - 1) * itemsPerPage;
    const type = 'users';
    const router = useRouter();
    const [data, setData] = useState<IResponse<IUser[]>>();

    useEffect(() => {

        const fetchData = async () => {
            const {data} = await allRoute<IResponse<IUser[]> | string>(`all-data?limit=${itemsPerPage}&skip=${skip}&type=${type}`);

            if (data === 'reject') {
                const response = await logout();
                if (response === 200) {
                    router.push('/login');
                }

            } else if (typeof data === 'object') {
                setData(data);
            }

        };
        fetchData();

    }, [searchParamsString]);

    return (
        <div className={classNames('users-all-info')}>
            <div className={classNames('users-list-wrapper')}>
                {data ? data.users.map((item: IUser) => <UserItem key={item.id} item={item}/>) : null}
            </div>
            <Pagination
                totalItems={data ? data.total : 0}
                itemsPerPage={itemsPerPage}
                currentPage={page}
                type={type}
            />
        </div>
    );
};

