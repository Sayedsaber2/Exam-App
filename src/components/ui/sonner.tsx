import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: (
          <CheckIcon className="size-4.5 text-emerald-500!" />
        ),
        info: (
          <InfoIcon className="size-4.5" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4.5" />
        ),
        error: (
          <OctagonXIcon className="size-4.5" />
        ),
        loading: (
          <Loader2Icon className="size-4.5 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--color-gray-800, #1F2937)",   // Figma: Gray/gray-800
          "--normal-text": "#ffffff",
          "--normal-border": "var(--color-gray-800, #1F2937)",
          "--border-radius": "0px",
          "--width": "400px",                                // Figma: Fixed 400px
          fontFamily: "var(--font-mono)",                    // Figma: Geist Mono
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast text-sm! font-medium! gap-2.5! shadow-[0_6px_13.1px_4px_rgba(0,0,0,0.10)]!",   // Figma: 14px / 500 / gap 10 / drop shadow
          title: "leading-none!",                             // Figma: line-height 100%
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
