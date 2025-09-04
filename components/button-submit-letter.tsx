"use client";
import { Button  } from "@/components/ui/button";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export default function ButtonSubmitLetter({
  isLoading = false,
  loadingText = "Submitting...",
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={isLoading || props.disabled} className="w-full flex items-center justify-center gap-2">
      {isLoading && (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white"></div>
      )}
      {isLoading ? loadingText : children}
    </Button>
  );
}
