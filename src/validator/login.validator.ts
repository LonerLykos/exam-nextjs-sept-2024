import {zod} from "@/lib/zod";


export const schema = zod.object({
    username: zod.string().min(1, "Choose your user name"),
    password: zod.string().min(1, "Choose your password"),
});
