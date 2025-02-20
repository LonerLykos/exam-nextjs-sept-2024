'use client';
import {FC} from "react";
import "./UserItem.scss";
import classNames from "classnames";
import {IUser} from "@/models/users-model/IUser";
import {useRouter} from "next/navigation";


interface Props {
    item: IUser;
}

export const UserItem: FC<Props> = ({item}) => {

    const router = useRouter();

    const userDetails = () => {
        router.push(`/users/id=${item.id}`)
    }

    return (
        <div className={classNames('user-short-details-wrapper')}>
            <h2>{item.firstName} {item.lastName}</h2>
            <h3>Age: {item.age}</h3>
            <p>User id: {item.id}</p>
            <p className={classNames('italic')}>Email: {item.email}</p>
            <button onClick={userDetails}>Info</button>
        </div>
    );
};
