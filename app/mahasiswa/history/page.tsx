"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Download, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
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

// Dummy data
const applicationData = [
  { id: "APP-001", letterType: "Course Assignment Letters", status: "Approved", submissionDate: new Date("2024-01-15"), approvalDate: new Date("2024-01-18"), uploadDate: new Date("2024-01-20") },
  { id: "APP-002", letterType: "Active Student Letters", status: "Pending", submissionDate: new Date("2024-01-20"), approvalDate: null, uploadDate: null },
  { id: "APP-003", letterType: "Graduation Certificates", status: "Rejected", submissionDate: new Date("2024-01-10"), approvalDate: new Date("2024-01-12"), uploadDate: null },
  { id: "APP-004", letterType: "Study Result Report Letters", status: "Approved", submissionDate: new Date("2024-01-05"), approvalDate: new Date("2024-01-08"), uploadDate: new Date("2024-01-10") },
  { id: "APP-005", letterType: "Active Student Letters", status: "Pending", submissionDate: new Date("2024-01-25"), approvalDate: null, uploadDate: null },
  // Tambahkan data dummy tambahan supaya pagination terlihat
  { id: "APP-006", letterType: "Course Assignment Letters", status: "Approved", submissionDate: new Date("2024-02-01"), approvalDate: new Date("2024-02-03"), uploadDate: new Date("2024-02-05") },
  { id: "APP-007", letterType: "Active Student Letters", status: "Rejected", submissionDate: new Date("2024-02-02"), approvalDate: new Date("2024-02-04"), uploadDate: null },
];

const letterTypes = ["Course Assignment Letters", "Active Student Letters", "Graduation Certificates", "Study Result Report Letters"];
const statusOptions = ["Pending", "Approved", "Rejected"];

const Page = () => {
  const [letterTypeFilter, setLetterTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      Approved: "default",
      Pending: "secondary",
      Rejected: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const filteredData = applicationData.filter((item) => {
    if (letterTypeFilter !== "all" && item.letterType !== letterTypeFilter) return false;
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (dateRange?.from && item.submissionDate < dateRange.from) return false;
    if (dateRange?.to && item.submissionDate > dateRange.to) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

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
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
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
                    <TableCell>{application.letterType}</TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>{format(application.submissionDate, "MMM dd, yyyy")}</TableCell>
                    <TableCell>{application.approvalDate ? format(application.approvalDate, "MMM dd, yyyy") : "-"}</TableCell>
                    <TableCell>{application.uploadDate ? format(application.uploadDate, "MMM dd, yyyy") : "-"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {application.status === "Approved" && application.uploadDate && (
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {application.status === "Pending" && (
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <X className="h-4 w-4" />
                          </Button>
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
