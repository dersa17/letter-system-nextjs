"use client";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusTimeline from "./StatusTimeline";
import LetterDetailContent from "@/components/LetterDetailContent";
import { Eye } from "lucide-react";
import { Prisma } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LetterDetailDrawerProps {
  letter: Prisma.PengajuanSuratGetPayload<{
    include: {
      laporanHasilStudi?: true;
      suratTugasMk?: { include: { course: true } };
      suratKeteranganLulus?: true;
      suratMahasiswaAktif?: true;
      user: true;
    };
  }>;
}

const LetterDetailDrawer = ({ letter }: LetterDetailDrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
     <Tooltip>
  <TooltipTrigger asChild>
    <div>
      <DrawerTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
    </div>
  </TooltipTrigger>
  <TooltipContent>
    <p>Detail</p>
  </TooltipContent>
</Tooltip>

      <DrawerContent className="flex flex-col h-[85vh]">
        <DrawerHeader className="border-b">
          <DrawerTitle>
            {letter.jenisSurat} - {letter.id}
          </DrawerTitle>
          <p className="text-sm text-muted-foreground mt-2">
            💡 Scroll down to view all details
          </p>
          <div className="mt-4">
            <StatusTimeline currentStatus={letter.status} />
          </div>
        </DrawerHeader>

        <ScrollArea className="flex-1 overflow-auto p-6">
          <LetterDetailContent letter={letter} />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default LetterDetailDrawer;
