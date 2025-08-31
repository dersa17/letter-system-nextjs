import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, ClipboardCheck, BookOpen } from "lucide-react";
import Link from "next/link";

const page = () => {
  const letterTypes = [
    {
      icon: ClipboardCheck,
      title: "Course Assignment Letters",
      description: "Letters for course assignments, project submissions, and academic task notifications.",
      features: ["Assignment format", "Academic tone", "Course templates"]
    },
    {
      icon: Users,
      title: "Active Student Letters",
      description: "Correspondence for active student status verification and enrollment confirmations.",
      features: ["Student verification", "Official status", "Enrollment proof"]
    },
    {
      icon: GraduationCap,
      title: "Graduation Certificates",
      description: "Official graduation certificates and completion documents for academic achievements.",
      features: ["Certificate format", "Official seal", "Academic credentials"]
    },
    {
      icon: BookOpen,
      title: "Study Result Report Letters",
      description: "Academic performance reports, grade transcripts, and study progress documentation.",
      features: ["Grade reports", "Academic results", "Progress tracking"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6  from-brand-primary to-brand-secondary bg-clip-text ">
              Welcome to LetterSystem
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
            A system for submitting student request letters
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
    
<Link href="/mahasiswa/letter">
  <Button
    size="lg"
    className="hover:bg-gray-600 text-white cursor-pointer"
  >
    Submit a Letter
  </Button>
</Link>

            </div>
          </div>
        </div>
      </section>

      {/* Letter Types Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Types of Letters
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
             Explore the different types of student letters available for various academic requests and submissions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {letterTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                      <IconComponent className="h-8 w-8 text-brand-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-card-foreground">
                      {type.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="mb-4 text-muted-foreground leading-relaxed">
                      {type.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};


export default page