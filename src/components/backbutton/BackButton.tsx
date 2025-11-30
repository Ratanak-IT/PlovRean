"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="mb-8">
  <button
    onClick={() => router.push("/course")}
    className="group relative inline-flex items-center gap-3 px-2 py-3 
               text-white font-medium text-sm tracking-wide
               bg-white/10 backdrop-blur-xl 
               border border-white/20 rounded-2xl
               hover:bg-white/20 
               hover:border-white/40 
               transition-all duration-300 
               shadow-lg hover:shadow-xl
               overflow-hidden"
  >
    <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent 
                     group-hover:translate-x-[100%] transition-transform duration-700" />
    <svg
      className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>

    <span>Back</span>
  </button>
</div>
  );
}
