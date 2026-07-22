import user from "@/app/model/user";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";

export async function POST(req) {
   await connectDB();
   try {
     const reqbody = await req.json();
     const { name, email, password } = reqbody;
     if (!name || !email || !password) {
       return NextResponse.json(
         { error: "Please provide name, email and password" },
         { status: 400 },
       );
     }

     const newUser = new user({
       name,
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
