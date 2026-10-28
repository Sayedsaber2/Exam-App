import { CircleX } from "lucide-react";


export default function ErrorAlert({ message }: { message: string }) {
  if (!message) return null;
  return <>
    <div className="border border-destructive bg-red-50 text-destructive text-sm text-center px-4 py-3 relative">
      <CircleX size={20} className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-red-50 rounded-full" />
      {message}
    </div>
  </>;
}
