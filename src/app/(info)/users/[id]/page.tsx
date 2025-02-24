import {Metadata} from "next";
import {UserDetails} from "@/components/users/user-details/UserDetails";

type Props = {
    params: {id: string};
};

export const generateMetadata = async ({params}:Props): Promise<Metadata> => {

    const id = (await params).id
    return {
        title: "DetailsUserById",
        description: `User details chosen by id=${id.split('%3D')[1]}`,
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