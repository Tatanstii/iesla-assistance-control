import React from "react";
import StudentForm from "../components/student-form";
import BackButton from "@/components/back-button";
import { getGroups } from "@/data/group";

export default async function NewStudentPage() {
  const groups = await getGroups();

  return (
    <main>
      <BackButton backPath="/admin/students" />
      <StudentForm groups={groups} />
    </main>
  );
}
