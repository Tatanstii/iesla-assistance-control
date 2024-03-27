import React from "react";
import { getStudents } from "@/data/student";
import { studentDataTableColumns } from "./components/columns";
import StudentsHeader from "./components/header";
import StudentDataTable from "./components/data-table";
import { getGroups } from "@/data/group";

export default async function AdminStudentsPage() {
  const students = await getStudents();
  const groups = await getGroups();

  return (
    <main>
      <StudentsHeader />
      <StudentDataTable data={students} columns={studentDataTableColumns} groups={groups} />
    </main>
  );
}
