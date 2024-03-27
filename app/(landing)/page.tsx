import LoginForm from "@/components/auth/login-form";
import Image from "next/image";
import InstituteLogo from "@/public/assets/images/iesla_logo.png";
import { Separator } from "@/components/ui/separator";
import { GrRun, GrUserAdd, GrUserExpert } from "react-icons/gr";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AvailableModule from "../components/available-module";

const modules = [
  {
    title: "Gestión de usuarios",
    description: "Administra los usuarios de la plataforma",
    Icon: GrUserAdd,
  },
  {
    title: "Control de llegada tarde",
    description: "Registra las llegadas tardes de los estudiantes",
    Icon: GrUserExpert,
  },
  {
    title: "Control de ingreso al restaurante",
    description: "Registra las asistencias de los estudiantes al restaurante",
    Icon: GrRun,
  },
];

export default function Home() {
  return (
    <main>
      <section className="md:h-dvh bg-iesla-outside bg-no-repeat bg-cover bg-center">
        <div className="h-full w-full flex flex-col-reverse  md:flex-row bg-primary/90">
          <div className="w-full md:w-3/4 flex flex-col px-10 py-5 md:px-20 md:py-10 justify-between">
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-primary-foreground uppercase">SICA</h1>
              <h2 className="text-primary-foreground text-xl">
                Sistema integrado para el control de asistencia y llegadas tardes
              </h2>
              <p className="text-accent  my-4">
                Navega por los diferentes módulos y mejora la experiencia al momento de controlar la
                a asistencia de los estudiantes y sus llegadas tardes.
              </p>
            </div>
            <ScrollArea className="whitespace-nowrap md:whitespace-normal">
              <div className="flex space-x-4 p-4">
                {modules.map(({ title, description, Icon }) => (
                  <div key={title} className="flex-1">
                    <AvailableModule title={title} description={description} Icon={Icon} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <footer>
              <p className="text-sm text-primary-foreground text-center mt-5">
                Powered by Jonathan Pérez
              </p>
            </footer>
          </div>
          <div className="flex-1 grid place-items-center bg-white">
            <div className="p-10 w-full">
              <div className="mb-5 block">
                <Image
                  src={InstituteLogo.src}
                  alt="IESLA logo"
                  width={100}
                  height={100}
                  className="mx-auto"
                />
              </div>
              <h1 className="mb-3 text-2xl font-bold text-center"> 🔒 Iniciar sesión 🔒 </h1>
              <Separator />
              <div className="mt-3 z-30 w-full">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
