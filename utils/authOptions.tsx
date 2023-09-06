import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "../models/user";
import bcrypt from "bcrypt";
import dbConnection from "./dbConnect";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials) {
        // error is causing 'cause of 'id' which is string in next-auth and it is ObjectId | number in db;
        dbConnection();
        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Please login via the method you use to signup");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error("Invalid email or password");
        }

        const userData = {
          name: user.name,
          email,
        };

        return userData;
      },
    }),
  ],
  callbacks: {
    // save user if they login via social networks
    async signIn({ user }) {
      dbConnection();
      console.log(user);

      const { email } = user;

      let dbUser = await User.findOne({ email });

      if (!dbUser) {
        dbUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }
      return true;
    },
    // add additional user info to the session (jwt, session)
    jwt: async ({ token, user }) => {
      // console.log("jwt callback", token, user);
      const userByEmail = await User.findOne({ email: token.email });
      userByEmail.password = undefined;
      token.user = userByEmail;
      
      return token;
    },
    session: async ({ session, token }) => {
      // console.log("session callback", session, token);
      session.user = token.user;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_URL,
  pages: {
    signIn: "/login",
  },
};
