import Head from "@/components/head";
import AttendanceGlassMilkForm from "./components/attendance-glass-milk-form";
import AssistanceList from "@/components/assistance-list";
import { getMilkGlassAssistance } from "@/actions/milk-glass-assistance";

export default async function AttendanceGlassMilkPage() {
  const milkGlassAssistance = await getMilkGlassAssistance();

  return (
    <main>
      <Head title="Registro de asistencia al vaso de leche" />
      <section>
        <div className="grid place-items-center">
          <div>
            <AttendanceGlassMilkForm />
            <AssistanceList data={milkGlassAssistance} />
          </div>
        </div>
      </section>
    </main>
  );
}
