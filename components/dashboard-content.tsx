"use client";
import { useState } from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartPieLabelList } from "./pie-chart";
import useDashboardStore from "@/app/stores/dashboard-store";
import { handleDownload } from "@/lib/download.letter";
import { IconCircleCheckFilled, IconCircleXFilled, IconClockFilled, IconFlagFilled } from "@tabler/icons-react";
import { format } from "date-fns";
// import { Progress } from "@/components/ui/progress";


const getStatusBadge = (status: string) => {
  switch (status) {
    case "Approved":
      return (
        <Badge variant="outline" className="px-1.5 flex items-center gap-1">
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
          Approved
        </Badge>
      );
    case "Pending":
      return (
        <Badge variant="outline" className="px-1.5 flex items-center gap-1">
          <IconClockFilled className="fill-yellow-500 dark:fill-yellow-400" />
          Pending
        </Badge>
      );
    case "Finished":
      return (
        <Badge variant="outline" className="px-1.5 flex items-center gap-1">
          <IconFlagFilled className="fill-blue-500 dark:fill-blue-400" />
          Finished
        </Badge>
      );
    case "Rejected":
      return (
        <Badge variant="outline" className="px-1.5 flex items-center gap-1">
          <IconCircleXFilled className="fill-red-500 dark:fill-red-400" />
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};


export function AdminDashboardContent() {
  const {dataDashboardAdmin} = useDashboardStore()
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="space-y-6">
      {/* Quick Actions */}

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <TabsList className="grid grid-cols-3 w-fit">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="majors" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Majors
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Users
                <Badge variant="secondary">5 users</Badge>
              </CardTitle>
              <CardDescription>
                Manage user accounts, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataDashboardAdmin?.recentUser.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell>{index+1}</TableCell>
                      <TableCell className="font-medium">{user.nama}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        {user.role.nama}
                      </TableCell>
                      <TableCell>{ <Badge variant="outline" className="text-muted-foreground px-1.5">
        {user.status === "Aktif" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconCircleXFilled className="fill-red-500 dark:fill-red-400" />
        )}
        {user.status}
      </Badge>}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(user.createdAt, "MMM dd, yyyy")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Courses
                <Badge variant="secondary">
                 5 courses
                </Badge>
              </CardTitle>
              <CardDescription>
                  
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Id</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>SKS</TableHead>
                    <TableHead>Major</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataDashboardAdmin?.recentCourse.map((course, index) => (
                    <TableRow key={course.id}>
                      <TableCell>{index+1}</TableCell>
                      <TableCell className="font-medium">
                        {course.id}
                      </TableCell>
                      <TableCell>
                        {course.nama}
                      </TableCell>
                      <TableCell>
                        {course.sks}                       
                      </TableCell>
                      <TableCell>
                        {course.major.nama}
                      </TableCell>
                      <TableCell>{"-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="majors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Majors
                <Badge variant="secondary">5 programs</Badge>
              </CardTitle>
              <CardDescription>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Id</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataDashboardAdmin?.recentMajor.map((major, index) => (
                    <TableRow key={major.id}>
                      <TableCell>
                        {index+1}
                      </TableCell>
                      <TableCell className="font-medium">
                        {major.id}
                      </TableCell>
                      <TableCell>
                        {major.nama}
                      </TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function MoDashboardContent() {
  const {dataDashboardMO} = useDashboardStore()
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Quick Actions */}

      {/* Main Content Tabs */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Letters Uploaded
            <Badge variant="secondary">5 letters</Badge>
          </CardTitle>
          <CardDescription>Manage upload letter</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Letter Type</TableHead>
                <TableHead>Uploaded Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataDashboardMO?.recentLettersUploaded.map((l,i) => (
                <TableRow key={l.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{l.nrp}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {l.user.nama}
                  </TableCell>
                  <TableCell>{l.jenisSurat}</TableCell>
                  <TableCell>
                           {l.tanggalPersetujuan ? format(new Date(l.tanggalPersetujuan), "MM dd, yyyy") : "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(l.status)}</TableCell>
                  <TableCell>
                    <Button onClick={() => {handleDownload(l.fileSurat!)}} variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

            

      <ChartPieLabelList/>
      
    </div>
  );
}
export function KaprodiDashboardContent() {
  const {dataDashboardKaprodi} = useDashboardStore()
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Quick Actions */}

      {/* Main Content Tabs */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Letters Approval
            <Badge variant="secondary">5 letters</Badge>
          </CardTitle>
          <CardDescription>Manage Approval letter</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Letter Type</TableHead>
                <TableHead>Approval Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataDashboardKaprodi?.recentLettersApproval.map((l, i) => (
                <TableRow key={l.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{l.user.id}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {l.user.nama}
                  </TableCell>
                  <TableCell>{l.jenisSurat}</TableCell>
                  <TableCell>
                     {l.tanggalPersetujuan ? format(new Date(l.tanggalPersetujuan), "MM dd, yyyy") : "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(l.status)}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDownload(l.fileSurat!)} variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

            

      <ChartPieLabelList/>
      
    </div>
  );
}
