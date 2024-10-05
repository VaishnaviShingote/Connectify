import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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