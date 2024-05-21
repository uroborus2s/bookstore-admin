import * as React from 'react';
import { forwardRef, type InputHTMLAttributes } from 'react';

export interface CircularProgressProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const CircularProgress = forwardRef<HTMLInputElement, CircularProgressProps>(
  ({ type, ...props }, ref) => {
    return (
      <div className="text-zinc-500 relative w-10 h-10 *:absolute *:left-0 *:top-0 *:w-full *:h-full *:before:animation-circle-bounce-delay *:before:animation-circle-bounce-delay *:before:content-[''] *:before:block *:before:mx-auto *:before:rounded-full *:before:bg-gray-800 *:before:w-[15%] *:before:h-[15%]">
        <div className="rotate-0 " />
        <div className="rotate-30 before:animation-delay-1" />
        <div className="rotate-60 before:animation-delay-2" />
        <div className="rotate-90 before:animation-delay-3" />
        <div className="rotate-120 before:animation-delay-4" />
        <div className="rotate-150 before:animation-delay-5" />
        <div className="rotate-180 before:animation-delay-6" />
        <div className="rotate-210 before:animation-delay-7" />
        <div className="rotate-240 before:animation-delay-8" />
        <div className="rotate-270 before:animation-delay-9" />
        <div className="rotate-300 before:animation-delay-10" />
        <div className="rotate-330 before:animation-delay-11" />
      </div>
    );
  },
);

CircularProgress.displayName = 'CircularProgress';

export { CircularProgress };
