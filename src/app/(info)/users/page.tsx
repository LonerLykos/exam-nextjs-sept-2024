import {UsersList} from "@/components/users/users-list/UsersList";
import {Suspense} from "react";

const UsersListPage = async () => {
    return (
        <div>
            <Suspense>
                <UsersList/>
            </Suspense>
        </div>
    );
};

export default UsersListPage;
