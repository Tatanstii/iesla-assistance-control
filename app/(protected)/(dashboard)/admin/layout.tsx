import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: React.PropsWithChildren) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return redirect("/");
  }

  return <>{children}</>;
}
