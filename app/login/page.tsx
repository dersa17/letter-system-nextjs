import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
         <div className="relative hidden lg:block">
       <Image src="https://gb9oyv3aknnnvqa0.public.blob.vercel-storage.com/image/ChatGPT%20Image%20May%2010%2C%202025%2C%2002_20_48%20PM.png"
          alt="Image"
          className="absolute inset-0" layout="fill"   />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
   
    </div>
  )
}
