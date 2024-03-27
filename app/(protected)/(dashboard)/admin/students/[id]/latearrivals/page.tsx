import DataTable from "@/components/data-table";
import LateStudentArrivalForm from "./components/late-student-arrival-form";
import { lateArrivalDataTableColumns } from "./components/columns";
import { getLateArrivalsByStudent } from "@/actions/late-arrivals";
import Head from "@/components/head";
import { getStudentById } from "@/data/student";
import BackButton from "@/components/back-button";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    date: Date;
  };
};

export default async function LateArrivalsPage({ params, searchParams }: Props) {
  const student = await getStudentById(params.id);
  const lateStudentArrivals = await getLateArrivalsByStudent(params.id, searchParams.date);
  return (
    <main>
      <BackButton backPath="/admin/students" />
      {student && (
        <Head
          title={`Llegadas tardes del estudiante 👨‍🎓 ${student.firstName} ${student.lastName}`}
        />
      )}
      <div className="mb-4">
        <LateStudentArrivalForm />
      </div>
      {lateStudentArrivals && (
        <DataTable data={lateStudentArrivals} columns={lateArrivalDataTableColumns} />
      )}
    </main>
  );
}
