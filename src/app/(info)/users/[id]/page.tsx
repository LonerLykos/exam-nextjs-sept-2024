import {Metadata} from "next";
import {UserDetails} from "@/components/users/user-details/UserDetails";

type Props = {
    params: Promise<{
        [key: string]: string | string [] | undefined
    }>;
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {


    const id = (await params).id;
    if (id && typeof id === 'string') {
        return {
            title: "DetailsUserById",
            description: `User details chosen by id=${id.split('%3D')[1]}`,
        }
    } else {
        return {
            title: "SomeError metadata",
            description: "",
        }
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