import { Prisma } from "@prisma/client";
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconClockFilled,
  IconFlagFilled,
  IconDotsVertical,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { format } from "date-fns";
import LetterDetailDrawer from "./LetterDetailDrawer";
import { Check, X, Download, Upload } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const userColumns = (
  handleOpenDialogCreateUpdate: (
    data: Prisma.UserGetPayload<{
      include: {
        role: true;
        major: true;
      };
    }>
  ) => void,
  handleOpenDialogDelete: (id: string) => void
): ColumnDef<
  Prisma.UserGetPayload<{
    include: {
      role: true;
      major: true;
    };
  }>
>[] => [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => row.original.id,
    enableHiding: false,
  },
  {
    accessorKey: "nama",
    header: "Name",
    cell: ({ row }) => {
      return row.original.nama;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return row.original.email;
    },
  },
  {
    accessorKey: "alamat",
    header: "Address",
    cell: ({ row }) => {
      return row.original.alamat;
    },
  },
  {
    accessorKey: "periode",
    header: "Period",
    cell: ({ row }) => {
      return row.original.periode;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "Aktif" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconCircleXFilled className="fill-red-500 dark:fill-red-400" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    accessorFn: (row) => row.role.nama,
    cell: ({ row }) => {
      return row.original.role.nama;
    },
  },
  {
    accessorKey: "major",
    header: "Major",
    accessorFn: (row) => row.major?.nama,
    cell: ({ row }) => {
      return row.original.major?.nama || <>-</>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => handleOpenDialogCreateUpdate(row.original)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => handleOpenDialogDelete(row.original.id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
export const courseColumns = (
  handleOpenDialogCreateUpdate: (
    data: Prisma.CourseGetPayload<{
      include: {
        major: true;
      };
    }> | null
  ) => void,
  handleOpenDialogDelete: (id: string) => void
): ColumnDef<
  Prisma.CourseGetPayload<{
    include: {
      major: true;
    };
  }>
>[] => [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => row.original.id,
    enableHiding: false,
  },
  {
    accessorKey: "nama",
    header: "Name",
    cell: ({ row }) => {
      return row.original.nama;
    },
  },
  {
    accessorKey: "sks",
    header: "SKS",
    cell: ({ row }) => {
      return row.original.sks;
    },
  },
  {
    accessorKey: "major",
    header: "Major",
    accessorFn: (row) => row.major.nama,
    cell: ({ row }) => {
      return row.original.major.nama;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => handleOpenDialogCreateUpdate(row.original)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => handleOpenDialogDelete(row.original.id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export const majorColumns = (
  handleOpenDialogCreateUpdate: (
    data: Prisma.MajorGetPayload<object> | null
  ) => void,
  handleOpenDialogDelete: (id: string) => void
): ColumnDef<Prisma.MajorGetPayload<object>>[] => [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => row.original.id,
    enableHiding: false,
  },
  {
    accessorKey: "nama",
    header: "Name",
    cell: ({ row }) => {
      return row.original.nama;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => handleOpenDialogCreateUpdate(row.original)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => handleOpenDialogDelete(row.original.id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
export const kaprodiLetterColumns = (
  handleOpenDialogApproveLetter: (id: number) => void,
  handleOpenDialogRejectLetter: (id: number) => void
): ColumnDef<
  Prisma.PengajuanSuratGetPayload<{
    include: {
      laporanHasilStudi?: true;
      suratTugasMk?: { include: { course: true } };
      suratMahasiswaAktif?: true;
      suratKeteranganLulus?: true;
      user: true;
    };
  }>
>[] => [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => row.original.id,
    enableHiding: false,
  },
  {
    accessorKey: "user.nama",
    header: "Name",
    enableGlobalFilter: true,
    cell: ({ row }) => {
      return row.original.user.nama;
    },
  },
  {
    accessorKey: "jenisSurat",
    header: "Letter Type",
    enableColumnFilter: true, // Enable untuk column filter
    filterFn: "multiSelect", // Gunakan custom filter function
    cell: ({ row }) => {
      return row.original.jenisSurat;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableColumnFilter: true,
    filterFn: "multiSelect",
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="px-1.5 flex items-center gap-1">
          {row.original.status === "Approved" ? (
            <>
              <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
              Approved
            </>
          ) : row.original.status === "Rejected" ? (
            <>
              <IconCircleXFilled className="fill-red-500 dark:fill-red-400" />
              Rejected
            </>
          ) : row.original.status === "Finished" ? (
            <>
              <IconFlagFilled className="fill-blue-500 dark:fill-blue-400" />
              Finished
            </>
          ) : row.original.status === "Pending" ? (
            <>
              <IconClockFilled className="fill-yellow-500 dark:fill-yellow-400" />
              Pending
            </>
          ) : (
            row.original.status
          )}
        </Badge>
      );
    },
  },

  {
    accessorKey: "tanggalPengajuan",
    header: "Submission Date",
    enableColumnFilter: true,
    filterFn: "dateRange", // Gunakan date range filter
    cell: ({ row }) => {
      return row.original.tanggalPengajuan
        ? format(new Date(row.original.tanggalPengajuan), "MMM dd, yyyy")
        : "-";
    },
  },
  {
    accessorKey: "tanggalPersetujuan",
    header: "Approval Date",
    cell: ({ row }) => {
      return row.original.tanggalPersetujuan
        ? format(new Date(row.original.tanggalPersetujuan), "MMM dd, yyyy")
        : "-";
    },
  },
  {
    accessorKey: "tanggalUpload",
    header: "Upload Date",
    cell: ({ row }) => {
      return row.original.tanggalUpload
        ? format(new Date(row.original.tanggalUpload), "MM dd, yyyy")
        : "-";
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-start items-center gap-2">
        <LetterDetailDrawer letter={row.original} />
        {row.original.status === "Pending" && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleOpenDialogApproveLetter(row.original.id)}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0"
                >
                  <Check className="h-4 w-4"></Check>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Approve</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleOpenDialogRejectLetter(row.original.id)}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4"></X>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reject</p>
              </TooltipContent>
            </Tooltip>
          </>
        )}
        {row.original.fileSurat && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Download className="h-4 w-4"></Download>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    ),
  },
];


export const moLetterColumns = (
  handleOpenDialogUploadLetter: (id: number) => void,
  handleDownload: (fileSuratUrl: string) => void
): ColumnDef<
  Prisma.PengajuanSuratGetPayload<{
    include: {
      laporanHasilStudi?: true;
      suratTugasMk?: { include: { course: true } };
      suratMahasiswaAktif?: true;
      suratKeteranganLulus?: true;
      user: true;
    };
  }>
>[] => [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => row.original.id,
    enableHiding: false,
  },
  {
    accessorKey: "user.nama",
    header: "Name",
    enableGlobalFilter: true,
    cell: ({ row }) => {
      return row.original.user.nama;
    },
  },
  {
    accessorKey: "jenisSurat",
    header: "Letter Type",
    enableColumnFilter: true, // Enable untuk column filter
    filterFn: "multiSelect", // Gunakan custom filter function
    cell: ({ row }) => {
      return row.original.jenisSurat;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableColumnFilter: true,
    filterFn: "multiSelect",
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="px-1.5 flex items-center gap-1">
          {row.original.status === "Approved" ? (
            <>
              <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
              Approved
            </>
          ) : row.original.status === "Rejected" ? (
            <>
              <IconCircleXFilled className="fill-red-500 dark:fill-red-400" />
              Rejected
            </>
          ) : row.original.status === "Finished" ? (
            <>
              <IconFlagFilled className="fill-blue-500 dark:fill-blue-400" />
              Finished
            </>
          ) : row.original.status === "Pending" ? (
            <>
              <IconClockFilled className="fill-yellow-500 dark:fill-yellow-400" />
              Pending
            </>
          ) : (
            row.original.status
          )}
        </Badge>
      );
    },
  },

  {
    accessorKey: "tanggalPengajuan",
    header: "Submission Date",
    enableColumnFilter: true,
    filterFn: "dateRange", // Gunakan date range filter
    cell: ({ row }) => {
      return row.original.tanggalPengajuan
        ? format(new Date(row.original.tanggalPengajuan), "MMM dd, yyyy")
        : "-";
    },
  },
  {
    accessorKey: "tanggalPersetujuan",
    header: "Approval Date",
    cell: ({ row }) => {
      return row.original.tanggalPersetujuan
        ? format(new Date(row.original.tanggalPersetujuan), "MMM dd, yyyy")
        : "-";
    },
  },
  {
    accessorKey: "tanggalUpload",
    header: "Upload Date",
    cell: ({ row }) => {
      return row.original.tanggalUpload
        ? format(new Date(row.original.tanggalUpload), "MM dd, yyyy")
        : "-";
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-start items-center gap-2">
        <LetterDetailDrawer letter={row.original} />
       {(row.original.status === "Approved" || row.original.status === "Finished") && (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        onClick={() => handleOpenDialogUploadLetter(row.original.id)}
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0"
      >
        <Upload className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Upload</p>
    </TooltipContent>
  </Tooltip>
)}

        {row.original.fileSurat && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => handleDownload(row.original.fileSurat!)} size="sm" variant="outline" className="h-8 w-8 p-0">
                <Download className="h-4 w-4"></Download>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    ),
  },
];
