"use client";

import React from "react";
import { useSpring, animated } from "@react-spring/web";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  colorClass?: string; // Tailwind color classes for desktop+
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = "",
  colorClass = "text-white", // default desktop color
}) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { duration: 600 },
    reset: true,
  });

  return (
    <animated.span className={`font-semibold text-black md:${colorClass}`}>
      {number.to(
        (n) =>
          `${prefix}${n.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      )}
    </animated.span>
  );
};

export default AnimatedNumber;
