"use client";

import Image from "next/image";

import { useRouter } from 'next/navigation';
export default function CompactAIHeroSingleImage() {
    const router = useRouter();
  return (
    <section className="relative bg-gray-950 rounded-3xl overflow-hidden max-w-7xl mx-auto mt-10 shadow-2xl">
      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-pink-600 rounded-full blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Text */}
        <div className="p-6 md:p-8 text-white flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Reimagine your career in the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                AI era
              </span>
            </h2>
            <p className="text-gray-300 text-sm">
              Future-proof your skills with fresh content from real-world experts.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={()=>router.push("/course")} className="px-5 py-2.5 bg-white text-gray-900 font-semibold text-sm rounded-xl hover:bg-gray-100 transition hover:scale-105">
              Learn more
            </button>
          </div>
        </div>

        {/* Right: Only ONE beautiful floating image */}
        <div className="relative flex items-center justify-center p-8 min-h-64">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl scale-110 group-hover:scale-125 transition-transform duration-700"></div>
            
            <div className="relative transform transition-all duration-700 hover:scale-105 hover:-rotate-3">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/20">
                <Image
                  src={"/bannerhero.png"}
                  alt="AI Learning Experience"
                  width={400}
                  height={200}
                  className="rounded-2xl object-cover shadow-2xl"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGAoQ0y5gAAAABJRU5ErkJggg=="
                  priority
                />
              </div>
            </div>

            {/* Subtle floating animation */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}