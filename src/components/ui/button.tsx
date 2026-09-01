import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rain disabled:pointer-events-none disabled:opacity-50 transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary: "bg-rain text-foam hover:bg-rain-deep",
        ghost: "bg-transparent text-ink hover:bg-paper",
        night: "bg-foam/95 text-night hover:bg-foam",
        outline: "bg-surface text-ink outline outline-1 outline-ink/10 hover:outline-ink/20",
        moss: "bg-moss text-foam hover:bg-moss/90",
      },
      size: {
        md: "h-11 min-h-11 px-5 text-sm rounded-full",
        lg: "h-12 min-h-12 px-6 text-base rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
