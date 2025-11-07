"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-0.5 py-0.5 cursor-pointer transition-all duration-500 ease-in-out",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            // smaller pill shape
            "relative w-12 h-6 flex items-center rounded-full p-0.5",
            // neon gradient background
            "bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400",
            "hover:from-yellow-400 hover:via-fuchsia-500 hover:to-cyan-400",
            "transition-all duration-500 ease-in-out shadow-[0_0_10px_rgba(255,255,255,0.4)]",
            "backdrop-blur-md",
            classNames?.wrapper,
          ),
        })}
      >
        {/* Sliding Circle */}
        <div
          className={clsx(
            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white/90 shadow-lg flex items-center justify-center",
            "transition-all duration-500 ease-in-out transform",
            "border border-white/40",
            isSelected ? "translate-x-6" : "translate-x-0",
          )}
        >
          {/* Icon */}
          {isSelected ? (
            <MoonFilledIcon
              className="text-indigo-600 drop-shadow-[0_0_4px_rgba(99,102,241,0.8)] animate-pulse"
              size={14}
            />
          ) : (
            <SunFilledIcon
              className="text-yellow-500 drop-shadow-[0_0_4px_rgba(253,224,71,0.8)] animate-pulse"
              size={14}
            />
          )}
        </div>
      </div>
    </Component>
  );
};
