import { Student } from "@prisma/client";
import React from "react";
import { FaUsersSlash } from "react-icons/fa";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { PiStudentDuotone } from "react-icons/pi";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { LuHistory } from "react-icons/lu";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";

type Record = {
  date: string;
  student: Student;
};

type Props = {
  data: Record[];
};

export default function AssistanceList({ data }: Props) {
  return (
    <ScrollArea className="h-[300px] rounded-md bg-gray-100 shadow px-10 py-5">
      {!data.length && (
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <FaUsersSlash className="text-gray-400" size={40} />
          <small className="text-gray-400 text-base">No hay registros el día de hoy</small>
        </div>
      )}
      <div className="flex flex-col gap-5">
        {data.map((record, index) => (
          <>
            <div key={record.student.id} className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  <PiStudentDuotone size={35} />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">
                  {record.student.firstName} {record.student.lastName}
                </p>
                <small className="text-gray-400">{record.date}</small>
              </div>
              <div>
                <Link
                  href={`/admin/students/${record.student.id}/latearrivals`}
                  title={`Ver historial del estudiante ${record.student.firstName}`}
                  className="block rounded-md bg-primary text-white p-3 hover:bg-primary/80 transition"
                >
                  <LuHistory size={20} />
                </Link>
              </div>
            </div>
            {index !== data.length - 1 && <Separator />}
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
