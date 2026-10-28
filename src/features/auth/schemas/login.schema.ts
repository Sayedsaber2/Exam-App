import * as zod from "zod";

export const LoginSchema = zod.object({
    username: zod.string().nonempty("Username is required"),
    password: zod.string().nonempty("Password is required").regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Invalid password"),
})
export type LoginFormValues = zod.infer<typeof LoginSchema>;