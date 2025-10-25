import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await userLogin(credentials.email, credentials.password);
        return user || null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/user/login",
    signOut: "/user/signout",
  },
  callbacks: {
    async jwt({token,user}){
      return {...token,...user}
    },
    async session({session,token,user}){
      session.user = token as any;
      return session
    }
  }
};
