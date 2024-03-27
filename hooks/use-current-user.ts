import { useSession } from "next-auth/react";

export const useCurrentUser = function () {
  const session = useSession();
  return session.data?.user;
};
