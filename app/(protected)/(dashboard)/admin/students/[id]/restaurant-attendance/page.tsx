import BackButton from "@/components/back-button";
import Head from "@/components/head";
import { getStudentById } from "@/data/student";
import React from "react";
import { getRestaurantAttendanceByStudent } from "@/actions/restaurant-attendance";
import DataTable from "@/components/data-table";
import { attendanceRestaurantColumns } from "./components/columns";
import AttendanceResutarantStudentForm from "./components/attendance-resutarant-student-form";

type Props = {
  params: {
    id: string;
    date: Date;
  };
  searchParams: {
    date: Date;
  };
};

export default async function RestaurantAttendancePage({ params, searchParams }: Props) {
  const student = await getStudentById(params.id);
  const attendanceRestaurant = await getRestaurantAttendanceByStudent(params.id, searchParams.date);

  return (
    <main>
      <BackButton backPath="/admin/students" />
      {student && (
        <Head
          title={`Asistencias al restaurante del estudiante 👨‍🎓 ${student.firstName} ${student.lastName}`}
        />
      )}
      <div className="mb-4">
        <AttendanceResutarantStudentForm />
      </div>
      {attendanceRestaurant && (
        <DataTable data={attendanceRestaurant} columns={attendanceRestaurantColumns} />
      )}
    </main>
  );
}
