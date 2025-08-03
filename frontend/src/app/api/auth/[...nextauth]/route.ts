import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        
    ]
})

// GOOGLE_CLIENT_ID=122102283491-7q8ho8nviuf96tf5npf0q6kb3i27n3qp.apps.googleusercontent.com
// GOOGLE_CLIENT_SECRET=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


export { handler as GET, handler as POST }