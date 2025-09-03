"use client"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import CourseAssignmentLetterForm from "@/components/course-assignment-letter-form";
import ActiveStudentLetterForm from "@/components/active-student-letter-form";
import GraduationCertificateForm from "@/components/graduation-certificate-form";
import StudyResultReportLetterForm from "@/components/study-result-report-letter-form";

type LetterType = "assignment" | "active_student" | "graduation" | "study_result_report" | "";

const Page = () => {
  const [selectedLetterType, setSelectedLetterType] = useState<LetterType>("");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Submission of Letter</h1>
        <p className="text-muted-foreground mb-8">
          Create and manage your academic letters here.
        </p>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Create New Letter</CardTitle>
            <CardDescription>
              Select the type of letter you want to create and fill in the required information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Letter Type</label>
              <Select value={selectedLetterType} onValueChange={(value: LetterType) => setSelectedLetterType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a letter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assignment">Course Assignment</SelectItem>
                  <SelectItem value="active_student">Active Student</SelectItem>
                  <SelectItem value="graduation">Graduation Certificates</SelectItem>
                  <SelectItem value="study_result_report">Study Result Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Inline conditional rendering */}
            {selectedLetterType === "assignment" && <CourseAssignmentLetterForm />}
            {selectedLetterType === "active_student" && <ActiveStudentLetterForm />}
            {selectedLetterType === "graduation" && <GraduationCertificateForm />}
            {selectedLetterType === "study_result_report" && <StudyResultReportLetterForm />}
            {!selectedLetterType && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Please select a letter type to start creating your letter.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
