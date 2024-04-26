import { getMilkGlassAttendanceByStudent } from "@/actions/milk-glass-attendance";
import BackButton from "@/components/back-button";
import DataTable from "@/components/data-table";
import Head from "@/components/head";
import { getStudentById } from "@/data/student";
import { notFound } from "next/navigation";
import { milkGlassAttendanceDataTableColumns } from "./components/columns";
import MilkGlassAttendanceFilterForm from "./components/milk-glass-attendance-filter-form";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    date: Date;
  };
};

export default async function MilkGlassAttendancePage({ params, searchParams }: Props) {
  const student = await getStudentById(params.id);

  if (!student) {
    notFound();
  }

  const milkGlassAttendance = await getMilkGlassAttendanceByStudent(params.id, searchParams.date);

  return (
    <main>
      <BackButton backPath="/admin/students" />
      {student && (
        <Head title={`Asistencia al vaso de leche 👨‍🎓 ${student.firstName} ${student.lastName}`} />
      )}
      <div className="mb-4">
        <MilkGlassAttendanceFilterForm />
      </div>
      {milkGlassAttendance && (
        <DataTable data={milkGlassAttendance} columns={milkGlassAttendanceDataTableColumns} />
      )}
    </main>
  );
}
