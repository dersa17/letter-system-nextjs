"use client";

import { useState, useEffect, ReactNode } from "react";
import { format } from "date-fns";
import { CalendarIcon, Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";
import useLetterStore from "@/app/stores/letter-store";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CheckCircle, Clock, XCircle, Flag } from "lucide-react";
import DialogDelete from '@/components/dialog-delete'
import LetterDetailDrawer from "@/components/LetterDetailDrawer";


const letterTypes = ["Tugas Mata Kuliah", "Keterangan Lulus", "Mahasiswa Aktif", "Laporan Hasil Studi"];
const statusOptions = ["Pending", "Approved", "Rejected", "Finished"];

const Page = () => {
  const { letters, fetchLetters, deleteLetter } = useLetterStore()
  const [letterTypeFilter, setLetterTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isOpenDialogDelete, setOpenDialogDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchLetters()
  }, [fetchLetters])

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Approved: "bg-emerald-100 text-emerald-700 border border-emerald-200",
      Pending: "bg-amber-100 text-amber-700 border border-amber-200",
      Rejected: "bg-rose-100 text-rose-700 border border-rose-200",
      Finished: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    };

    const icons: Record<string, ReactNode> = {
      Approved: <CheckCircle className="mr-1 h-3.5 w-3.5" />,
      Pending: <Clock className="mr-1 h-3.5 w-3.5" />,
      Rejected: <XCircle className="mr-1 h-3.5 w-3.5" />,
      Finished: <Flag className="mr-1 h-3.5 w-3.5" />,
    };

    return (
      <Badge
        className={`inline-flex items-center ${variants[status] || "bg-gray-100 text-gray-700 border border-gray-200"}`}
      >
        {icons[status]}
        {status}
      </Badge>
    );
  };
  const filteredData = letters.filter((item) => {
    const pengajuanDate = new Date(item.tanggalPengajuan); // 🔑 convert dulu

    if (letterTypeFilter !== "all" && item.jenisSurat !== letterTypeFilter) return false;
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (dateRange?.from && pengajuanDate < dateRange.from) return false;
    if (dateRange?.to && pengajuanDate > dateRange.to) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));


  const handleOpenDialogDelete = (id: number) => {
    setDeleteId(id);
    setOpenDialogDelete(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Student Application History</h1>
        <p className="text-muted-foreground mb-8">View your letter applications and their current status.</p>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Letter Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Letter Type</label>
                <Select value={letterTypeFilter} onValueChange={(val) => { setLetterTypeFilter(val); setCurrentPage(1); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    {letterTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Submission Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={(range) => { setDateRange(range); setCurrentPage(1); }}
                      numberOfMonths={2}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Letter Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Approval Date</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>{application.jenisSurat}</TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>{format(application.tanggalPengajuan, "MMM dd, yyyy")}</TableCell>
                    <TableCell>{application.tanggalPersetujuan ? format(application.tanggalPersetujuan, "MMM dd, yyyy") : "-"}</TableCell>
                    <TableCell>{application.tanggalUpload ? format(application.tanggalUpload, "MMM dd, yyyy") : "-"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {application.status === "Finished" && application.tanggalUpload && (
                          <Tooltip>
                            <TooltipTrigger asChild><Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button></TooltipTrigger>
                            <TooltipContent>
                              <p>Download</p>
                            </TooltipContent>
                          </Tooltip>

                        )}

                        <LetterDetailDrawer letter={application} />

                        {application.status === "Pending" && (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild><Button onClick={() => handleOpenDialogDelete(application.id)} size="sm" variant="outline" className="h-8 w-8 p-0">
                                <X className="h-4 w-4" />
                              </Button></TooltipTrigger>
                              <TooltipContent>
                                <p>Delete</p>
                              </TooltipContent>
                            </Tooltip>
                            <DialogDelete open={isOpenDialogDelete} onOpenChange={setOpenDialogDelete} onDelete={() => deleteId !== null && deleteLetter(deleteId)} />
                          </>

                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-end items-center mt-4 gap-2">
              <Button size="sm" variant="outline" onClick={handlePrevPage} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button size="sm" variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
