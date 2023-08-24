import NextAuth, { DefaultSession } from "next-auth";
import { User } from "../models/user";
import { ObjectId } from "mongoose";

declare module "next-auth" {
  interface User {
    _id: string;
  }
  
  // interface Session {
  //   user: User & DefaultSession["user"];

  // } 
}