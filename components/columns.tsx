import {Prisma} from "@prisma/client"
import {IconCircleCheckFilled, IconCircleXFilled, IconDotsVertical,  } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"



export const userColumns = (
  handleOpenDialogCreateUpdate: (data: Prisma.UserGetPayload<{include: {
        role: true
        major: true
      }}>) => void,
  handleOpenDialogDelete: (id: string) => void,
): ColumnDef<Prisma.UserGetPayload<{include: {
    role: true,
    major: true
  
    }}>>[] => [  

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
          return  row.original.nama
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
          return  row.original.email
        },
      },
      {
        accessorKey: "alamat",
        header: "Address",
        cell: ({ row }) => {
          return  row.original.alamat
        },
      },
      {
        accessorKey: "periode",
        header: "Period",
        cell: ({ row }) => {
          return  row.original.periode
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
          return row.original.role.nama
        },
      },
      {
        accessorKey: "major",
        header: "Major",
        accessorFn: (row) => row.major?.nama,
        cell: ({ row }) => {
          return row.original.major?.nama || <>-</>
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
              <DropdownMenuItem onClick={() => handleOpenDialogCreateUpdate(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => handleOpenDialogDelete(row.original.id)} >Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },

    ]
 export const courseColumns = (
  handleOpenDialogCreateUpdate: (data: Prisma.CourseGetPayload<{include: {
    major:true
  }}> | null) => void,
  handleOpenDialogDelete: (id: string) => void

 ): ColumnDef<Prisma.CourseGetPayload<{include:{
    major: true;
  }}>>[] => [
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
          return row.original.nama
        }
      },
      {
        accessorKey: "sks",
        header: "SKS",
        cell: ({ row }) => {
          return  row.original.sks
        },
      },
      {
        accessorKey: "major",
        header: "Major",
        accessorFn: (row) => row.major.nama,
        cell: ({ row }) => {
          return  row.original.major.nama
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
              <DropdownMenuItem onClick={() => handleOpenDialogCreateUpdate(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive"  onClick={() => handleOpenDialogDelete(row.original.id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },

     
    ]

export const majorColumns = (
  handleOpenDialogCreateUpdate: (data: Prisma.MajorGetPayload<object> | null) => void,
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
          return  row.original.nama
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
              <DropdownMenuItem onClick={() => handleOpenDialogCreateUpdate(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => handleOpenDialogDelete(row.original.id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },

    ]