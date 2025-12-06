// // app/api/auth/[...nextauth]/route.js
// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import LinkedInProvider from "next-auth/providers/linkedin";
// import pool from "@/lib/db"; // adjust path to your project (use absolute alias if available)
// import { randomUUID } from "crypto";

// export const authOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     }),
//     LinkedInProvider({
//       clientId: process.env.LINKEDIN_CLIENT_ID,
//       clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
//       // optional: scope: "r_liteprofile r_emailaddress",
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//     // maxAge, updateAge etc can be added here
//   },

//   secret: process.env.NEXTAUTH_SECRET, // use NEXTAUTH_SECRET consistently

//   callbacks: {
//     // This runs whenever a JWT is created/updated.
//     async jwt({ token, account, profile, user }) {
//       try {
//         // On first sign-in, profile or user will be present — prefer those
//         const email = token.email || profile?.email || user?.email;
//         const name = token.name || profile?.name || user?.name || "Unnamed";
//         const picture = token.picture || profile?.picture || profile?.image || user?.image || null;

//         if (!email) {
//           // nothing to do if we don't have an email
//           return token;
//         }

//         // Try to find user by email
//         const { rows } = await pool.query(
//           "SELECT id, name, email, profile_pic, is_admin, is_writer FROM users WHERE email = $1 LIMIT 1",
//           [email]
//         );

//         if (rows.length > 0) {
//           const dbUser = rows[0];
//           token.id = dbUser.id;
//           token.name = dbUser.name;
//           token.email = dbUser.email;
//           token.profilePic = dbUser.profile_pic;
//           token.isAdmin = dbUser.is_admin;
//           token.isWriter = dbUser.is_writer;
//         } else {
//           // Insert new user (make sure email has UNIQUE constraint in DB)
//           const newId = randomUUID();
//           const insertRes = await pool.query(
//             `INSERT INTO users (id, name, email, is_writer, is_admin, created_at, profile_pic)
//              VALUES ($1, $2, $3, $4, $5, NOW(), $6)
//              RETURNING id, name, email, profile_pic, is_admin, is_writer`,
//             [newId, name, email, false, false, picture]
//           );
//           const newUser = insertRes.rows[0];
//           token.id = newUser.id;
//           token.name = newUser.name;
//           token.email = newUser.email;
//           token.profilePic = newUser.profile_pic;
//           token.isAdmin = newUser.is_admin;
//           token.isWriter = newUser.is_writer;
//         }

//         return token;
//       } catch (err) {
//         console.error("NextAuth jwt callback error:", err);
//         return token; // return token even on error to avoid blocking auth flow
//       }
//     },

//     // Session callback: what client receives via useSession()
//     async session({ session, token }) {
//       try {
//         session.user = session.user || {};
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.profilePic = token.profilePic || null;
//         session.user.image = token.profilePic || null;
//         session.user.isAdmin = !!token.isAdmin;
//         session.user.isWriter = !!token.isWriter;
//       } catch (err) {
//         console.error("NextAuth session callback error:", err);
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import pool from "../../../../lib/db.js"; // adjust path if needed

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // using JWT sessions because no Account/Session tables needed
  session: { strategy: "jwt" },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // ---------------------------------------------
    // 1️⃣ JWT callback → create or load user
    // ---------------------------------------------
    async jwt({ token, account, profile }) {
      // no email? return token
      if (!token.email) return token;

      // check if user exists in DB
      const existing = await pool.query(
        `SELECT * FROM "User" WHERE email = $1 LIMIT 1`,
        [token.email]
      );

      // ---------------------------------------------
      // Create new user if not exists
      // ---------------------------------------------
      if (existing.rows.length === 0) {
        const insert = await pool.query(
          `INSERT INTO "User" (name, email, image, bio, role)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, name, email, image, bio, role`,
          [
            token.name || profile?.name || "Unnamed",
            token.email,
            token.picture || null,
            null,                 // bio default null
            "staff",              // default role
          ]
        );

        const user = insert.rows[0];

        // attach to token
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.bio = user.bio;
        token.role = user.role;
      }

      // ---------------------------------------------
      // User exists → load into token
      // ---------------------------------------------
      else {
        const user = existing.rows[0];

        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.bio = user.bio;
        token.role = user.role;
      }

      return token;
    },

    // ---------------------------------------------
    // 2️⃣ Session callback → expose data to frontend
    // ---------------------------------------------
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.bio = token.bio;
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

