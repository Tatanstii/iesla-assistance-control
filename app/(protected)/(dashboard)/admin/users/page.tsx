import React from "react";
import DataTable from "@/components/data-table";
import { getUsers } from "@/data/user";
import { userDataTableColumns } from "./components/columns";
import UsersHeader from "./components/header";
import { DEFAULT_ADMIN_USER_EMAIL } from "@/lib/const";

export default async function AdminUserPage() {
  const users = await getUsers();

  const usersWithoutAdminUser = users.filter((user) => user.email !== DEFAULT_ADMIN_USER_EMAIL);

  return (
    <main>
      <UsersHeader />
      <DataTable data={usersWithoutAdminUser} columns={userDataTableColumns} />
    </main>
  );
}
