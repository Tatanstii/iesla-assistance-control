import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";

type ExtendTableOption = {
  asLink?: boolean;
};

const HeaderOptions = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("w-full flex flex-col md:flex-row justify-start md:justify-between mb-2", className)}
      {...props}
    />
  )
);
HeaderOptions.displayName = "HeaderOptions";

const HeaderHead = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 flex flex-row mb-3 md:mb-0 items-center", className)} {...props} />
  )
);
HeaderHead.displayName = "HeaderHead";

const HeaderTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg text-primary ", className)} {...props} />
  )
);
HeaderTitle.displayName = "HeaderTitle";

const HeaderContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 flex flex-row justify-start md:justify-end flex-wrap md:flex-nowrap gap-2", className)} {...props} />
  )
);
HeaderContent.displayName = "HeaderContent";

const HeaderOption = forwardRef<HTMLButtonElement, ButtonProps & ExtendTableOption>(
  ({ className, ...props }, ref) => <Button ref={ref} {...props} className={className} />
);
HeaderOption.displayName = "HeaderOption";

export { HeaderContent, HeaderHead, HeaderTitle, HeaderOption, HeaderOptions };
