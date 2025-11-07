declare module "@radix-ui/react-dialog" {
  import * as React from "react";

  export const Root: React.FC<React.ComponentPropsWithoutRef<"div">>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<"button">>;
  export const Close: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<"button"> & React.RefAttributes<HTMLButtonElement>
  >;
  export const Portal: React.FC<React.PropsWithChildren>;
  export const Overlay: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<"div"> & React.RefAttributes<HTMLDivElement>
  >;
  export const Content: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<"div"> & React.RefAttributes<HTMLDivElement>
  >;
  export const Title: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<"h2"> & React.RefAttributes<HTMLHeadingElement>
  >;
  export const Description: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<"p"> & React.RefAttributes<HTMLParagraphElement>
  >;
}

declare module "class-variance-authority" {
  export function cva(
    base?: string,
    options?: {
      variants?: Record<string, Record<string, string>>;
      defaultVariants?: Record<string, string>;
      compoundVariants?: Array<Record<string, string>>;
    }
  ): (options?: Record<string, string | undefined>) => string;

  export type VariantProps<T extends (...args: any[]) => string> = T extends (
    options?: infer Options
  ) => string
    ? Options extends Record<string, any>
      ? { [K in keyof Options]?: Options[K] }
      : never
    : never;
}

