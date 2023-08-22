import NextAuth, { DefaultSession } from "next-auth";
import { User } from "../models/User";
import { ObjectId } from "mongoose";

declare module "next-auth" {
  interface User {
    _id: number;
  }
  
  // interface Session {
  //   user: User & DefaultSession["user"];

  // } 
}