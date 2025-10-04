import z from "zod";

export interface CustomJwtSessionClaims {
    metadata?: {
        role?: "user" | "admin";
    }
};


export const UserFormSchema = z.object({
    firstName: z.string({ error: "first name is required" }).min(2, { error: "first name must be atleast 2 characters" }).max(20),
    lastName: z.string({ error: "last name is required" }).min(2, { error: "last name must be at least 2 characters" }).max(20),
    username: z.string({ error: "username is required" }).min(6, { error: "username must be at least 2 characters" }).max(20),
    emailAddress: z.array(z.email({ error: "should be a valid email address" })),
    password: z.string({ error: "Password is required" }).min(8, { error: "Password should be at least 8 characters" }).max(20)
})