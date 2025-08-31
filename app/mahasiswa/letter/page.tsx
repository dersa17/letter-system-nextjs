"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type LetterType = "assignment" | "active_student" | "graduation" | "learning_outcome" | "";

interface AssignmentLetterData {
  institutionPurpose: string;
  period: string;
  studentData: string;
  objective: string;
  topic: string;
  course: string;
}

interface ActiveStudentLetterData {
  fullName: string;
  studentId: string;
  period: string;
  address: string;
  submissionPurpose: string;
}

interface GraduationLetterData {
  fullName: string;
  studentId: string;
  graduationDate: string;
}

interface LearningOutcomeLetterData {
  fullName: string;
  studentId: string;
  submissionPurpose: string;
}

const Page = () => {
  const [selectedLetterType, setSelectedLetterType] = useState<LetterType>("");
  
  const assignmentForm = useForm<AssignmentLetterData>();
  const activeStudentForm = useForm<ActiveStudentLetterData>();
  const graduationForm = useForm<GraduationLetterData>();
  const learningOutcomeForm = useForm<LearningOutcomeLetterData>();

  const onSubmitAssignment = (data: AssignmentLetterData) => {
    console.log("Assignment Letter Data:", data);
    // Handle form submission
  };

  const onSubmitActiveStudent = (data: ActiveStudentLetterData) => {
    console.log("Active Student Letter Data:", data);
    // Handle form submission
  };

  const onSubmitGraduation = (data: GraduationLetterData) => {
    console.log("Graduation Letter Data:", data);
    // Handle form submission
  };

  const onSubmitLearningOutcome = (data: LearningOutcomeLetterData) => {
    console.log("Learning Outcome Letter Data:", data);
    // Handle form submission
  };

  const renderForm = () => {
    switch (selectedLetterType) {
      case "assignment":
        return (
          <Form {...assignmentForm}>
            <form onSubmit={assignmentForm.handleSubmit(onSubmitAssignment)} className="space-y-6">
              <FormField
                control={assignmentForm.control}
                name="institutionPurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose of Institution</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter the purpose of the institution" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={assignmentForm.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the period (e.g., 2024/2025)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={assignmentForm.control}
                name="studentData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter student information" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={assignmentForm.control}
                name="objective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objective</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter the objective" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={assignmentForm.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the topic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={assignmentForm.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the course name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Submit Assignment Letter</Button>
            </form>
          </Form>
        );

      case "active_student":
        return (
          <Form {...activeStudentForm}>
            <form onSubmit={activeStudentForm.handleSubmit(onSubmitActiveStudent)} className="space-y-6">
              <FormField
                control={activeStudentForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={activeStudentForm.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter student ID number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={activeStudentForm.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the period (e.g., 2024/2025)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={activeStudentForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter full address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={activeStudentForm.control}
                name="submissionPurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose of Submission</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter the purpose of submission" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Submit Active Student Certificate</Button>
            </form>
          </Form>
        );

      case "graduation":
        return (
          <Form {...graduationForm}>
            <form onSubmit={graduationForm.handleSubmit(onSubmitGraduation)} className="space-y-6">
              <FormField
                control={graduationForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={graduationForm.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter student ID number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={graduationForm.control}
                name="graduationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Submit Graduation Certificate</Button>
            </form>
          </Form>
        );

      case "learning_outcome":
        return (
          <Form {...learningOutcomeForm}>
            <form onSubmit={learningOutcomeForm.handleSubmit(onSubmitLearningOutcome)} className="space-y-6">
              <FormField
                control={learningOutcomeForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={learningOutcomeForm.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter student ID number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={learningOutcomeForm.control}
                name="submissionPurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose of Submission</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter the purpose of submission" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Submit Learning Outcome Report</Button>
            </form>
          </Form>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Please select a letter type to start creating your letter.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Submission of Letter</h1>
        <p className="text-muted-foreground mb-8">Create and manage your academic letters here.</p>
        
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
                  <SelectItem value="assignment">College Assignment Letter</SelectItem>
                  <SelectItem value="active_student">Certificate of Active Student</SelectItem>
                  <SelectItem value="graduation">Certificate of Graduation</SelectItem>
                  <SelectItem value="learning_outcome">Learning Outcome Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {renderForm()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


export default Page