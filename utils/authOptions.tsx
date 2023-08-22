import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";
import dbConnection from "./dbConnect";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) { // error is causing 'cause of 'id' which is string in next-auth and it is ObjectId | number in db;
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
        console.log(user);
        return { user };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_URL,
  pages: {
    signIn: "/login",
  },
};
