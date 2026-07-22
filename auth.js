import NextAuth from "next-auth";

export const { handlers, logIn, signup, auth } = NextAuth({
  providers: [],
});
