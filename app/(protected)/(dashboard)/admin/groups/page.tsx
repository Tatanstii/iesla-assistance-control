import DataTable from "@/components/data-table";
import { getGroups } from "@/data/group";
import React from "react";
import { groupDataTableColumns } from "./components/columns";
import GroupsHeader from "./components/header";

export default async function GroupsPage() {
  const groups = await getGroups();
  return (
    <main>
      <GroupsHeader />
      <DataTable
        data={groups}
        columns={groupDataTableColumns}
        filterKey="nombre"
        filterPlaceholder="Filtrar por nombre"
      />
    </main>
  );
}
