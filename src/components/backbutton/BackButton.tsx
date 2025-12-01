"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
  <div className="mb-8">
    <button
      onClick={() => router.push("/course")}
      className="
        group relative inline-flex items-center gap-3 px-2 py-3 text-sm font-medium tracking-wide
        rounded-2xl transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl

        /* Light Mode */
        bg-white/10 border border-black/10 text-black
        hover:bg-black/5 hover:border-black/20

        /* Dark Mode */
        dark:bg-white/10 dark:text-white dark:border-white/20
        dark:hover:bg-white/20 dark:hover:border-white/40
      "
    >
      {/* Shine effect */}
      <span
        className="
          absolute inset-0 translate-x-[-100%] 
          bg-gradient-to-r from-transparent via-black/10 to-transparent
          dark:via-white/20
          group-hover:translate-x-[100%] 
          transition-transform duration-700
        "
      />

      {/* Icon */}
      <svg
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>

      <span>Back</span>
    </button>
  </div>
);
}
