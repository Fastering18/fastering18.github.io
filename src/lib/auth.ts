import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Admin Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (
                    credentials?.username === process.env.ADMIN_USER &&
                    credentials?.password === process.env.ADMIN_PASS
                ) {
                    return { id: "1", name: "Admin" };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
});
