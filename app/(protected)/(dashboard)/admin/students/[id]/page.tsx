import { getStudentById } from "@/data/student";
import BackButton from "@/components/back-button";
import StudentForm from "../components/student-form";
import { redirect } from "next/navigation";
import { getGroups } from "@/data/group";

type Props = {
  params: {
    id: string;
  };
};

export default async function StudentDetailsPage({ params }: Props) {
  const student = await getStudentById(params.id);
  const groups = await getGroups();

  if (!student) {
    redirect("/admin/students");
  }

  return (
    <main>
      <BackButton backPath="/admin/students" />
      <StudentForm initData={student} groups={groups} />
    </main>
  );
}
