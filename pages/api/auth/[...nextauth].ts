import NextAuth, {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"
import { getEnv } from "../../../lib/get-config-value"


const GithubID = getEnv("GITHUB_ID");
const GithubSecret = getEnv("GITHUB_SECRET");
// const GoogleID = getEnv("GOOGLE_ID");
// const GoogleSecret = getEnv("GOOGLE_SECRET");


export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: GithubID,
            clientSecret: GithubSecret,
        }), 
        // GoogleProvider({
        //     clientId: GoogleID, 
        //     clientSecret: GoogleSecret
        // })
    ], 
    callbacks: {
        async jwt({token}) {
            token.userRole = "admin"
            return token; 
        }
    }
}


export default NextAuth(authOptions)
