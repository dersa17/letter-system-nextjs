import { Clock, X, Check, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusTimelineProps {
  currentStatus: string
}

const StatusTimeline = ({ currentStatus }: StatusTimelineProps) => {
  const steps = [
    {
      id: "Pending",
      label: "Pending",
      icon: Clock,
      description: "Submission received"
    },
    {
      id: "Rejected",
      label: "Rejected", 
      icon: X,
      description: "Needs revision"
    },
    {
      id: "Approved",
      label: "Approved",
      icon: Check,
      description: "Ready for processing"
    },
    {
      id: "Finished",
      label: "Finished",
      icon: FileCheck,
      description: "Letter completed"
    }
  ];

  const getStepIndex = (status: string) => steps.findIndex(step => step.id === status);
  const currentIndex = getStepIndex(currentStatus);

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "Rejected":
        return "bg-rose-100 text-rose-700 border border-rose-20";
      case "Approved":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "Finished":
        return "bg-indigo-100 text-indigo-700 border border-indigo-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-academic-gray -z-10">
          <div 
            className="h-full bg-indigo-100 transition-all duration-500"
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const stepStatus = getStepStatus(index);
          const Icon = step.icon;
          const isActive = index === currentIndex;
          
          return (
            <div key={step.id} className="flex flex-col items-center relative">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  stepStatus === "completed" && "bg-indigo-100 border-academic-blue text-indigo-700",
                  stepStatus === "current" && getStatusColors(step.id) + " border-transparent shadow-lg scale-110",
                  stepStatus === "upcoming" && "bg-white border-academic-gray text-muted-foreground"
                )}
              >
                <Icon size={18} />
              </div>
              
              <div className="mt-3 text-center min-w-0">
                <div 
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive && "text-foreground",
                    !isActive && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1 max-w-20">
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;