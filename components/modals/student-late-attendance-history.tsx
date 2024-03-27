"use client";

import { useStudentLateAttendanceModal } from "@/store/student-late-attendance";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import LateAttendanceHistory from "../../app/(protected)/(dashboard)/admin/students/components/late-attendance-history";

export default function StudentLateAttendanceHistoryModal() {
  const isOpen = useStudentLateAttendanceModal((state) => state.open);
  const onClose = useStudentLateAttendanceModal((state) => state.onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ver histórico de llegadas tardes</DialogTitle>
        </DialogHeader>
        <LateAttendanceHistory />
      </DialogContent>
    </Dialog>
  );
}
