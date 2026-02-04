
  import { betterAuth } from "better-auth";
  import { prismaAdapter } from "better-auth/adapters/prisma";
  import  prisma  from "@/lib/prisma";

  export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),
    session: {
      expiresIn: 60 * 30, 
    },
    advanced: {
      defaultCookieAttributes: {
        maxAge: 60 * 30, 
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    },
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        redirectURL: `${process.env.BETTER_AUTH_URL}/api/auth/callback/github`,
      },
    },
  }) 
