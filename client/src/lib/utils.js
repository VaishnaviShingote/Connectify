import { clsx } from "clsx"
import { Divide, LogOut } from "lucide-react";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottie-json";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ffd60a2a] text-[#ffd60e] border-[1px] border-[#ffd60abb]",
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
];

export const getColor = (color) => {
  if(color >=0 && color < colors.length){
    return colors[color];
  }
  return colors[0];
};

export const animationDefaultOptions={
  loop:true,
  autoplay:true,
  animationData,
}