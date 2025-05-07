import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog"
import React from "react";

export default function DialogCreateUpdate<T>({
  open,
  onOpenChange,
  initialData,
  type,
  children
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  initialData?: T | null;
  type: string | undefined;
  children: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit " : "Add "} {type}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
          {children}
      </DialogContent>
    </Dialog>
  );
}