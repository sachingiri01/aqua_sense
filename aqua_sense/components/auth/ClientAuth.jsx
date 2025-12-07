"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientAuth({ children, roles }) {
  const { data: session, status } = useSession();
  const router = useRouter();

 
  if (!session) {
    useEffect(() => {
      setTimeout(() => router.push("/"), 1500);
    }, []);

    return <div className="flex items-center justify-center h-screen text-center text-red-600 text-xl font-semibold">
        ❌ You must sign in to access this page.<br />Redirecting...
      </div>
  }

  // ❌ Role check (if roles prop exists)
  if (roles && !roles.includes(session.user.role)) {
    useEffect(() => {
      setTimeout(() => router.push("/unauthorized"), 1500);
    }, []);

    return <div className="flex items-center justify-center h-screen text-center text-red-600 text-xl font-semibold">
        ❌ Access denied.<br />Redirecting...
      </div>
  }

  // ✔ All good
  return <>{children}</>;
}
