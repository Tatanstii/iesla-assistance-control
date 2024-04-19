import React from "react";
import { getStudents } from "@/data/student";
import StudentsHeader from "./components/header";
import StudentDataTable from "./components/data-table";
import { getGroups } from "@/data/group";

type Props = {
  searchParams?: {
    group?: string;
    search?: string;
  };
};

export default async function AdminStudentsPage({ searchParams }: Props) {
  const students = await getStudents({
    group: searchParams?.group,
    search: searchParams?.search,
  });
  const groups = await getGroups();

  return (
    <main>
      <StudentsHeader />
      <StudentDataTable data={students} groups={groups} />
    </main>
  );
}
