import Head from "@/components/head";
import React from "react";
import DataTable from "@/components/data-table";
import { getUsers } from "@/data/user";
import { userDataTableColumns } from "./components/columns";
import UsersHeader from "./components/header";

export default async function AdminUserPage() {
  const users = await getUsers();
  return (
    <main>
      <UsersHeader />
      <DataTable data={users} columns={userDataTableColumns} />
    </main>
  );
}
