import { deleteStudent } from "@/actions/student";
import ConfirmDialog from "@/components/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { LuClock, LuMoreHorizontal, LuPencil, LuTrash2 } from "react-icons/lu";

type Props = {
  studentId: string;
};

const STUDENTS_PATH = "/admin/students";

export default function StudentRowMenu({ studentId }: Props) {
  const router = useRouter();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();

  const handleOnEdit = () => {
    router.push(`${STUDENTS_PATH}/${studentId}/`);
  };

  const onConfirm = async () => {
    try {
      await deleteStudent(studentId).then((response) => {
        if (response.success) {
          toast.success(response.success);
        }
        if (response.error) {
          toast.error(response.error);
        }
      });
      router.refresh();
    } catch (error) {
      toast.error("Error desconocido");
    }
  };

  const handleOnDelete = async () => {
    onOpen();
  };

  const handleOnLateArrival = () => {
    router.push(`/history/${studentId}/latearrivals`);
  };

  const handleOnRestauranAttendance = () => {
    router.push(`/history/${studentId}/restaurant-attendance`);
  };

  const handleOnMilkGlassAttendance = () => {
    router.push(`/history/${studentId}/milk-glass-attendance`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="border p-1 rounded-md transition hover:bg-slate-200">
            <LuMoreHorizontal size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem className="hover:cursor-pointer" onClick={handleOnEdit}>
              <LuPencil size={18} className="mr-4" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cursor-pointer" onClick={handleOnDelete}>
              <LuTrash2 size={18} className="mr-4" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Histórico de asistencias</DropdownMenuLabel>
            <DropdownMenuItem className="hover:cursor-pointer" onClick={handleOnLateArrival}>
              <LuClock size={18} className="mr-4" />
              <span>Ver llegadas tardes</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={handleOnRestauranAttendance}
            >
              <LuClock size={18} className="mr-4" />
              <span>Ver asistencias al restaurante</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={handleOnMilkGlassAttendance}
            >
              <LuClock size={18} className="mr-4" />
              <span>Ver asistencias al vaso de leche</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        title="¿Estás seguro que deseas eliminar el estudiante?"
        description="Se borrará todo el histórico asociado a este estudiante, esta acción no se puede deshacer."
        open={isOpen}
        onCancel={onClose}
        onOpenChange={onToggle}
        onSuccess={onConfirm}
      />
    </>
  );
}
