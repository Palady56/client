import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {

    pages: {
        signIn: '/auth/login'
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            async authorize(credentials, req) {

                const res = await fetch(`${process.env.URL_INTERNAL}/back/api/v1/login`, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                })

                if (res.status >= 400) {
                    return null
                }

                const user = await res.json()

                return user
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
        // ...add more providers here
    ],
    callbacks: {
        async jwt({token, user}) {
            return { ...token, ...user }
        },
        async session ({ session, token, user }) {
            session.user = token
            return session
        },
    },  
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }