import Head from "@/components/head";
import AttendanceGlassMilkForm from "./components/attendance-glass-milk-form";
import AssistanceList from "@/components/assistance-list";
import { getMilkGlassAttendance } from "@/actions/milk-glass-attendance";

export default async function AttendanceGlassMilkPage() {
  const milkGlassAttendance = await getMilkGlassAttendance();

  return (
    <main>
      <Head title="Registro de asistencia al vaso de leche" />
      <section>
        <div className="grid place-items-center">
          <div>
            <AttendanceGlassMilkForm />
            <AssistanceList data={milkGlassAttendance} pathname="milk-glass-attendance" />
          </div>
        </div>
      </section>
    </main>
  );
}
