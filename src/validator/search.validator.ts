import {zod} from "@/lib/zod";

export const schema = zod.object({
    searching: zod.string()
        .min(1, { message: "Can be at least 1 char" })
        .max(25, { message: "Cannot be greater than 25 chars" })
        .regex(/^(?:[A-Za-z\s]+|\d+)$/, "You can use chars with 'space' or number. Not together"),
})