"use client"

import { deleteGroup } from "@/actions/group";
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
import { LuMoreHorizontal, LuPencil, LuTrash2 } from "react-icons/lu";

type Props = {
  groupId: number;
};

const GROUPS_PATH = "/admin/groups";

export default function GroupRowMenu({ groupId }: Props) {
  const router = useRouter();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();

  const handleOnEdit = () => {
    router.push(`${GROUPS_PATH}/${groupId}/`);
  };

  const onConfirm = async () => {
    try {
      await deleteGroup(groupId).then((response) => {
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
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        title="¿Estás seguro que deseas eliminar el grupo?"
        description="Esta acción no se puede deshacer."
        open={isOpen}
        onCancel={onClose}
        onOpenChange={onToggle}
        onSuccess={onConfirm}
      />
    </>
  );
}
