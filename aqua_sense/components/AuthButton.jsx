"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  // If user LOGGED IN → show Logout + Profile
  if (session?.user) {
    return (
      <div className="hidden md:flex items-center gap-3">

        {/* Profile section */}
        <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-full backdrop-blur-md shadow-lg border border-white/20">
          <img
            src={session.user.image}
            alt="profile"
            className="w-8 h-8 rounded-full border border-white"
          />
          <span className="text-black font-medium">{session.user.name}</span>
        </div>

        {/* Logout Button (same theme as Get Started) */}
        <button
          onClick={() => signOut()}
          className="relative px-6 py-3 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 
                     text-white font-semibold rounded-full overflow-hidden group shadow-lg 
                     hover:shadow-xl transition-shadow"
        >
          <span className="relative z-10">Logout</span>
          <div className="absolute inset-0 bg-gradient-to-r 
                          from-orange-accent to-shakespeare-500 opacity-0 
                          group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>
    );
  }

  // If NOT logged in → original Get Started button
  return (
    <button
      onClick={() => signIn("google")}
      className="hidden md:block relative px-6 py-3 bg-gradient-to-r 
                 from-shakespeare-500 to-shakespeare-600 text-white font-semibold 
                 rounded-full overflow-hidden group shadow-lg hover:shadow-xl transition-shadow"
    >
      <span className="relative z-10">Get Started</span>
      <div className="absolute inset-0 bg-gradient-to-r 
                      from-orange-accent to-shakespeare-500 opacity-0 
                      group-hover:opacity-100 transition-opacity"></div>
    </button>
  );
}
