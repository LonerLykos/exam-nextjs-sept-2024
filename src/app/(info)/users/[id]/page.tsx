import {Metadata} from "next";
import {UserDetails} from "@/components/users/user-details/UserDetails";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "",
        description: "",
    }
}

const UserByIdPage = () => {
    return (
        <div>
            <UserDetails/>
        </div>
    );
};

export default UserByIdPage;