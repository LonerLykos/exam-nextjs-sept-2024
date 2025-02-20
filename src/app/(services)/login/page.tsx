import {Metadata} from "next";
import {FormLogin} from "@/components/form/FormLogin";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "Sing-in page",
        description: "Sing-in for use site",
    }
}

const Page = () => {
    return (
        <div>
            <FormLogin/>
        </div>
    );
};

export default Page;