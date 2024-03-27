import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

type Props = {
  title: string;
  description?: string;
  open?: boolean;
  onSuccess: () => void;
  onCancel: () => void;
  onOpenChange: (open: boolean) => void;
};

export default function ConfirmDialog({
  title,
  description,
  open,
  onSuccess,
  onCancel,
  onOpenChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {description && <DialogDescription>{description}</DialogDescription>}
        <div className="flex flex-row justify-end gap-3 my-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Canclear
          </Button>
          <Button type="button" variant="destructive" onClick={onSuccess}>
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
