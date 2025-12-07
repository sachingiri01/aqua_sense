import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// roles prop → optional array of allowed roles
export default async function RequireAuth({ children, roles }) {
  const session = await getServerSession(authOptions);

  // ❌ Not logged in
  if (!session) {
    redirect("/"); // or "/api/auth/signin"
  }

  // ❌ Role restricted
  if (roles && !roles.includes(session.user.role)) {
    redirect("/");
  }

  // ✔ Logged in and permitted
  return <>{children}</>;
}
