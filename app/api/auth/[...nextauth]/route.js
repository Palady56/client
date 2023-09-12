import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    pages: {
        signIn: '/auth/login',
        // signOut: '/auth/signout',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',

    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.URL_INTERNAL}/back/api/v1/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });

                if (res.status !== 200) return null;
                const user = await res.json();

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return {
                        email: user.email,
                        name: user.firstName + ' ' + user.lastName,
                        image: user.avatar,
                        token: user.token,
                        jti: user.jti
                    };
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })

    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user === undefined) {
                const res = await fetch(`${process.env.URL_INTERNAL}/back/api/v1/user/profile`, {
                    method: "GET",
                    headers: {
                        Authorization: token.token
                    }
                });

                if (res.status !== 200) return null;
                const userData = await res.json();
                token.name = userData.firstName + ' ' + userData.lastName
                token.image = userData.avatar
            }
            return {...token, ...user};
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },

    // session: {
    //     strategy: "jwt",
    // },
    // secret: process.env.NEXTAUTH_SECRET,

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }