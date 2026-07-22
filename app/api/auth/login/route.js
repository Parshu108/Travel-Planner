import user from "@/app/model/user";
import connectDB from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function POST(req) {
   await connectDB();
   try {
        const reqbody = await req.json();
        const { email, password } = reqbody;
        if ( !email || !password) {
          return NextResponse.json(
            { error: "Please provide email and password" },
            { status: 400 },
          );
        }
   
        const newUser = new user({
          email,
          password,
        });
   
        const savedUser = await newUser.save();
   
        return NextResponse.json(
          {
            message: "User registered successfully",
            success: true,
            user: savedUser,
          },
          { status: 201 },
        );
      } catch (error) {
        console.error("Register error:", error);
   
        if (error.code === 11000) {
          return NextResponse.json(
            { error: "User already exists" },
            { status: 400 },
          );
        }
   
        return NextResponse.json(
          { error: "Something went wrong, please try again later" },
          { status: 500 },
        );
      }
   
}